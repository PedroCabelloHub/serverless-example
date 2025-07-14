import { handlerPath } from '@libs/handler-resolver';

export const logout = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'auth/logout',
      },
    },
  ],
};
