import { handlerPath } from '@libs/handler-resolver';

export const getProfile = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'auth/getProfile',
        cors: {
          origin: '*', // aquí el origen exacto de tu frontend
          headers: ['Content-Type', 'Authorization'],
          allowCredentials: true,
        },        
      },
    },
  ],
};
