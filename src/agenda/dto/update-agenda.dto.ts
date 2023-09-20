import { PartialType } from '@nestjs/mapped-types';
import { CreateAgendaDto } from './create-agenda.dto';

export class UpdateAgendaDto extends PartialType(CreateAgendaDto) {
  isAtivo: boolean;
  modifiedAt;
  local_default;
  situacao_default;
}
