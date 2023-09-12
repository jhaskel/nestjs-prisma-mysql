import { PartialType } from '@nestjs/mapped-types';
import { CreateFrotaVeiculoUserDto } from './create-frota-veiculo-user.dto';

export class UpdateFrotaVeiculoUserDto extends PartialType(
  CreateFrotaVeiculoUserDto,
) {}
