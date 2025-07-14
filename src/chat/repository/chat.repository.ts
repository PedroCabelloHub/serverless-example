import { PrismaService } from "@libs/prisma";
import { inject, injectable } from "inversify";
import { CreateMessageDto } from "../dto/message.dto";

@injectable()
export class ChatRepository {
    constructor(@inject(PrismaService) private prismaService: PrismaService) { }

    async createConversation(senderId: number, recipientId: number) {
        const existingConversation = await this.prismaService.client.conversation.findFirst({
            where: {
                participants: {
                    some: {
                        userId: senderId
                    }
                }, AND: {
                    participants: {
                        some: {
                            userId: recipientId
                        }
                    }
                }
            }
        })

        if (!existingConversation) {
            const newConversation = await this.prismaService.client.conversation.create({
                data: {
                    participants: {
                        create: [
                            { user: { connect: { id: senderId } } },
                            { user: { connect: { id: recipientId } } }
                        ]
                    }
                }, include: {
                    participants: true
                }
            })
            return newConversation
        }

        return existingConversation
    }

    async createMessage(dto: CreateMessageDto) {
        const message = await this.prismaService.client.message.create({
            data: {
                content: dto.content,
                conversation: { connect: { id: dto.conversationId } },
                sender: { connect: { id: dto.senderId } },
                recipient: { connect: { id: dto.recipientId } },
            },
            select: {
                id: true,
                content: true,
                createdAt: true,
                conversationId: true,
                sender: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                recipient: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        return message;
    }

    async getConversation(senderId: number, recipientId: number) {
        const conversation = await this.prismaService.client.conversation.findFirst({
          where: {
            AND: [
              { participants: { some: { userId: senderId } } },
              { participants: { some: { userId: recipientId } } }
            ]
          },
          select: {
            id: true,
            participants: {
              select: {
                user: {
                  select: {
                    id: true,
                    name: true
                  }
                }
              }
            },
            messages: {
              orderBy: { createdAt: 'asc' },
              select: {
                id: true,
                content: true,
                createdAt: true,
                senderId: true,
                recipientId: true,
                sender: { select: { id: true, name: true } },
                recipient: { select: { id: true, name: true } }
              }
            }
          }
        });
      
        return conversation;
      }
      
}