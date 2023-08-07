import { PartialType } from '@nestjs/mapped-types';
import { CreateFrotaViagemDto } from './create-frota-viagem.dto';
import { IsDateString, IsNumber } from 'class-validator';

export class UpdateFrotaViagemDto extends PartialType(CreateFrotaViagemDto) {
  isAtiva: boolean;
  isAtivo: boolean;
  @IsDateString()
  finalAt;
  @IsNumber()
  kmFinal: number;
  //  @IsBoolean()
  // isViajando:boolean
  //  @IsOptional()
  //s  @IsBoolean()
  // isAtivo:boolean
}
