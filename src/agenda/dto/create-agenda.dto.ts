import { IsNumber, IsString } from 'class-validator';

export class CreateAgendaDto {
  retornoAt;
  @IsNumber()
  userId: number;
  setorId: number;
  @IsString()
  situacao: string;
  local: string;
}
