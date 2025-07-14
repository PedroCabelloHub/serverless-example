import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  senderId: number;

  @IsInt()
  recipientId: number;

  @IsOptional()
  @IsInt()
  conversationId?: number;
}

