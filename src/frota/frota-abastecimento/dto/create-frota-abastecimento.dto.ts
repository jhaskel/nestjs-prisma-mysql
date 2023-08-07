import { IsNumber } from 'class-validator';

export class CreateFrotaAbastecimentoDto {
  @IsNumber()
  userId: number;
  veiculoId: number;
  kmAt: number;
  litros: number;
}
