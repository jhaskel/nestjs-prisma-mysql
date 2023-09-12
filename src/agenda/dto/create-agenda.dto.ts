import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAgendaDto {
  @IsNumber()
  userId: number;
  @IsString()
  situacao: string;
  local: string;
  status: string;
  retornoAt: string;
}
