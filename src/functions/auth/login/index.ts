import { handlerPath } from '@libs/handler-resolver';
import schema from './schema';

export const login = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'auth/login',
        request: {
            schemas:{
                'application/json': schema
            }
        },
        cors: {
          origin: '*', // aquí el origen exacto de tu frontend
          headers: ['Content-Type', 'Authorization', 'Set-Cookie'],
          allowCredentials: true,
        },        
      },
    },
  ],
};
