import { PartialType } from '@nestjs/mapped-types';
import { CreateFrotaVeiculoDto } from './create-frota-veiculo.dto';

export class UpdateFrotaVeiculoDto extends PartialType(CreateFrotaVeiculoDto) {}
