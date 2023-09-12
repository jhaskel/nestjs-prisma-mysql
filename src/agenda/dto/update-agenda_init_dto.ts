import { IsString } from 'class-validator';

export class UpdateAgendaIniDto {
  modifiedAt;
  retornoAt;
  @IsString()
  situacao: string;
  local: string;
  status: string;
}
