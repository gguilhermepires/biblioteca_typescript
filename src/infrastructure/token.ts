import jwt, { JwtPayload } from 'jsonwebtoken';

import '../config/config';
import { ITokenPayload } from '../interfaces/iUser';

export default class Token {
  static generateToken(tokenData: any): string {
    const tokenSecret = process.env.JSON_WEB_TOKEN_ACCESS_TOKEN_SECRET;
    if (tokenSecret === undefined)
      throw new Error(`Could not generate JWT, secret invalid`);
    return jwt.sign(tokenData, tokenSecret, {
      expiresIn: 60 * 60*60, // 15 minutes
    });
  }

  static decode(token: string): ITokenPayload | null {
    const tokenSecret = process.env.JSON_WEB_TOKEN_ACCESS_TOKEN_SECRET;
    if (tokenSecret === undefined)
      throw new Error(`Could open JWT, secret invalid`);

    const tokenPayload: string | JwtPayload = jwt.verify(
      token,
      String(tokenSecret),
    );
    if (typeof tokenPayload === 'string') return null;
    if (tokenPayload.userId == null || tokenPayload.userId === '') return null;

    return {
      userId: tokenPayload.userId,
      roles: tokenPayload.roles,
      ssoId: tokenPayload.ssoId,
      firstName: tokenPayload.firstName,
      email: tokenPayload.email,
      iat: tokenPayload.iat,
      exp: tokenPayload.exp,
    };
  }
}
