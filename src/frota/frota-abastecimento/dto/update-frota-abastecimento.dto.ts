import { PartialType } from '@nestjs/mapped-types';
import { CreateFrotaAbastecimentoDto } from './create-frota-abastecimento.dto';

export class UpdateFrotaAbastecimentoDto extends PartialType(CreateFrotaAbastecimentoDto) {}
