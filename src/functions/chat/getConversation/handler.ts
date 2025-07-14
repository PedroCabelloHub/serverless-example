import { formatJSONResponse } from "@libs/api-gateway"
import { APIGatewayProxyEvent } from "aws-lambda"
import { ChatService } from "src/chat/services/chat.services"
import { container } from "src/config/inversify.config"
import { authenticatedHandler } from "src/middleware/authenticated-handler"


export const main = authenticatedHandler( async (event: APIGatewayProxyEvent) => {
    try {
      const { senderId, recipientId } = event.queryStringParameters || {}
  
      console.log("Query params:", event.queryStringParameters)
  
      if (!senderId || !recipientId) {
        return formatJSONResponse({
          message: "senderId y recipientId son requeridos como query params"
        }, 400)
      }
  
      const chatService = container.get(ChatService)
      const conversation = await chatService.getConversation(Number(senderId), Number(recipientId))
  
      if (!conversation) {
        return formatJSONResponse({
          message: "Conversación no encontrada"
        }, 404)
      }
  
      return formatJSONResponse({
        message: "Conversación obtenida con éxito",
        conversation
      }, 200)
  
    } catch (error) {
      console.error(error)
      return formatJSONResponse({
        message: "Error inesperado"
      }, 500)
    }
  });