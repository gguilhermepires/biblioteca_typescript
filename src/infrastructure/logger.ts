import { Log } from '@prisma/client';

import { prismaClient } from '../database/prismaClient';

enum LogCode {
  code01 = '1',
  code02 = '2',
  code03 = '3',
  code04 = '4',
}

interface ILogger {
  error: {
    type: string;
    obj: any;
    message: string;
    stack: any;
  };
}

class Logger {
  static async info(code: string, message: string, data: any): Promise<Log> {
    return prismaClient.log.create({
      data: {
        type: 'INFO',
        message,
        code,
        data,
      },
    });
  }

  static async warn(code: string, message: string, data: any): Promise<void> {
    await prismaClient.log.create({
      data: {
        type: 'WARNING',
        message,
        code,
        data,
      },
    });
  }

  static async error(
    code: string,
    message: string,
    erro: any,
  ): Promise<ILogger> {
    let messageErro = '';
    let stack;
    if (typeof erro === 'string') {
      messageErro = erro.toUpperCase();
    } else if (erro instanceof Error) {
      messageErro = erro.message;
      stack = erro.stack;
    }

    await prismaClient.log.create({
      data: {
        type: 'ERROR',
        message,
        code,
        data: {
          error: {
            type: typeof erro,
            obj: erro,
            message: messageErro,
            stack,
          },
        },
      },
    });

    return {
      error: {
        type: typeof erro,
        obj: erro,
        message: messageErro,
        stack,
      },
    };
  }
}
export default Logger;
export { ILogger, LogCode };
