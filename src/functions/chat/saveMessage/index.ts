import { handlerPath } from '@libs/handler-resolver';
import schema from './schema';

export const createMessage = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'chat/saveMessage',
        request:{
          schemas: {
            'application/json': schema
            
          },
        }
      },
    },
  ],
};
