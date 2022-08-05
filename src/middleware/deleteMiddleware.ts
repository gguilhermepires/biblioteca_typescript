/* eslint-disable no-param-reassign */
import moment from 'moment';

import { prismaClient } from '../database/prismaClient';

export default async function deleteMiddleware(): Promise<void> {
  prismaClient.$use(async (params, next) => {
    if (params.action === 'delete') {
      params.action = 'update';
      params.args.data = { deletedAt: moment().toDate() };
    }
    if (params.action === 'deleteMany') {
      params.action = 'updateMany';
      if (params.args.data !== undefined) {
        params.args.data.deleted = true;
      } else {
        params.args.data = { deletedAt: moment().toDate() };
      }
    }
    return next(params);
  });
}
