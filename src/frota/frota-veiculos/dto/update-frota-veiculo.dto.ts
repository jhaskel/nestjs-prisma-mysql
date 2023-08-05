import { PartialType } from '@nestjs/mapped-types';
import { CreateFrotaVeiculoDto } from './create-frota-veiculo.dto';
import { IsBoolean } from 'class-validator';

export class UpdateFrotaVeiculoDto extends PartialType(CreateFrotaVeiculoDto) {
  @IsBoolean()
  isViagem: boolean;
}
