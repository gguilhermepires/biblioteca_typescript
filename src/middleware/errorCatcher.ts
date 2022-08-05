import { Request, Response, NextFunction } from 'express';

const errorCatcherMiddleware =
  (fn: any) =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      return await Promise.resolve(fn(req, res, next));
    } catch (err) {
      if (process.env.NODE_ENV === 'development') console.log(err);
      return next(err);
    }
  };

export default errorCatcherMiddleware;
