import { IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNumber()
  documentoId: number;
  @IsNumber()
  remetente: number;
  @IsNumber()
  destinatario: number;
  @IsString()
  message: string;
}
