import { IsNumber, IsOptional } from 'class-validator';
import { CreateSetorDto } from './create-setor-dto';

export class UpdatePutSetorDto extends CreateSetorDto {
  @IsOptional()
  @IsNumber()
  secretarioId: number;
  responsavelId: number;
}
