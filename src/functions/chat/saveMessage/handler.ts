import { formatJSONResponse } from "@libs/api-gateway";
import { APIGatewayProxyEvent } from "aws-lambda";
import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";
import { CreateMessageDto } from "src/chat/dto/message.dto";
import { ChatService } from "src/chat/services/chat.services";
import { container } from "src/config/inversify.config";
import { authenticatedHandler } from "src/middleware/authenticated-handler";



export const main = authenticatedHandler ( async (event: APIGatewayProxyEvent) => {
    try {
        const body = JSON.parse(event.body || "{}")
        const dto = plainToInstance(CreateMessageDto, body)
        await validateOrReject(dto)

        const chatService = container.get(ChatService)

        const result = await chatService.createMessageConversation(dto)

        return formatJSONResponse({
            message: "Mensaje creado", result

        });

    } catch (error) {
        console.error(error)
        if (Array.isArray(error) && error.every(e => e instanceof ValidationError)) {
            const messages = error
                .map((err) => Object.values(err.constraints || {}))
                .flat();

            return formatJSONResponse(
                {
                    message: "Validation failed",
                    errors: messages,
                },
                400
            );
        }

        return formatJSONResponse(
            {
                message: error instanceof Error ? error.message : "Unexpected error.",
            },
            400
        );
    }

});