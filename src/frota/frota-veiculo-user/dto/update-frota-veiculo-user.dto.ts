import { PartialType } from '@nestjs/mapped-types';
import { CreateFrotaVeiculoUserDto } from './create-frota-veiculo-user.dto';
import { IsBoolean } from 'class-validator';

export class UpdateFrotaVeiculoUserDto extends PartialType(
  CreateFrotaVeiculoUserDto,
) {
  @IsBoolean()
  isTitular: boolean;
  isAtivo: boolean;
}
