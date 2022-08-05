import { NextFunction, Request, Response } from 'express';

import HttpException from '../errors/HttpException';

function errorHandlerMiddleware(
  error: HttpException,
  _request: Request,
  response: Response,
  _next: NextFunction,
): Response<any, Record<string, any>> {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong.';
  return response.status(status).send({
    message,
  });
}

export default errorHandlerMiddleware;
