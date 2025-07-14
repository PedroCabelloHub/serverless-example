import { handlerPath } from '@libs/handler-resolver';

export const getConversation = {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: 'get',
                path: 'chat/getConversation',
            },
        },
    ],
};
