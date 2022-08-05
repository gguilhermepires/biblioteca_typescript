import { Response, Request, NextFunction } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

import HttpException from '../errors/HttpException';

interface IValidateRequest {
  status: boolean;
  message: string;
}

const validatorMiddleware = (schemas: ValidationChain[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    await Promise.all(
      schemas.map((schema: ValidationChain) => schema.run(req)),
    );

    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    }

    const errors = result.array();

    const status = errors[0].msg.status || 400;
    const message = errors[0].msg.message || errors[0].msg;

    return next(new HttpException(status, message));
  };
};

async function validatorRequest(
  request: any,
  schemaValidation: any,
): Promise<IValidateRequest> {
  await Promise.all(
    schemaValidation.map((schema: ValidationChain) => schema.run(request)),
  );

  const result = validationResult(request);

  if (result.isEmpty())
    return {
      status: true,
      message: '',
    };

  const errors = result.array();

  return {
    status: false,
    message: errors[0].msg.message || errors[0].msg,
  };
}
export { validatorRequest };
export default validatorMiddleware;
