import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { prismaClient } from '../database/prismaClient';
import HttpException from '../errors/HttpException';
import Acl from '../infrastructure/acl';
import Token from '../infrastructure/token';
import { ITokenPayload } from '../interfaces/iUser';

const authorizationMiddleware =
  ({
    resource,
    action,
    attribute,
  }: {
    resource: string;
    action: string;
    attribute: string;
  }) =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      let jwt = req.headers.authorization;
      if (!jwt)
        throw new HttpException(StatusCodes.FORBIDDEN, `No credentials sent`);

      if (jwt.toLowerCase().startsWith('bearer'))
        jwt = jwt.slice('bearer'.length).trim();

      const tokenPayload: ITokenPayload | null = await Token.decode(jwt);
      if (tokenPayload == null)
        throw new HttpException(StatusCodes.FORBIDDEN, `Invalid token`);

      const userRoles: string[] = Acl.simplifyRole(tokenPayload.roles);

      const user = await prismaClient.user.findFirst({
        where: {
          email: tokenPayload.email,
          id: tokenPayload.userId,
        },
      });

      if (user == null)
        throw new HttpException(
          StatusCodes.FORBIDDEN,
          `Permission denied. Code:01`,
        );

      for await (const userRole of userRoles) {
        const aclUserRole = await Acl.getAclUserRole(userRole, user.id);
        if (aclUserRole === null)
          throw new HttpException(
            StatusCodes.FORBIDDEN,
            `Permission denied. Code:02`,
          );

        if (aclUserRole.AclGrant === undefined)
          throw new HttpException(
            StatusCodes.FORBIDDEN,
            `Permission denied. Code:03`,
          );

        if (
          (await Acl.can({
            aclGrant: aclUserRole.AclGrant,
            resource,
            action,
            attribute,
          })) === false
        )
          throw new HttpException(
            StatusCodes.FORBIDDEN,
            `Permission denied. Code: 04`,
          );
      }

      res.locals.user = tokenPayload;
      return next();
    } catch (err) {
      if (process.env.NODE_ENV === 'development') console.log(err);
      return next(err);
    }
  };

export default authorizationMiddleware;
