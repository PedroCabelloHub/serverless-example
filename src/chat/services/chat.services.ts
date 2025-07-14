import { inject, injectable } from "inversify";
import { CreateMessageDto } from "../dto/message.dto";
import { ChatRepository } from "../repository/chat.repository";

@injectable()
export class ChatService{
    constructor(@inject(ChatRepository) private chatRepository: ChatRepository){}

    async createMessageConversation(dto: CreateMessageDto) {
      const conversation = await this.chatRepository.createConversation(dto.senderId, dto.recipientId)
    
      const message = await this.chatRepository.createMessage({
        ...dto,
        conversationId: conversation.id
      })
    
      return message;
    }

    async getConversation(senderId:number, recipientId:number){
      if (senderId === recipientId) {
        throw new Error("No puedes iniciar conversación contigo mismo.");
      }
    
      return await this.chatRepository.getConversation(senderId,recipientId)

    }
    
      
}