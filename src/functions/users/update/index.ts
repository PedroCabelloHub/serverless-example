import { handlerPath } from '@libs/handler-resolver';

export const update = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'put',
        path: 'users/update/{id}',
      },
    },
  ],
};
