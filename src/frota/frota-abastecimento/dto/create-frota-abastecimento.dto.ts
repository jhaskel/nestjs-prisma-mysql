import { IsNumber } from 'class-validator';

export class CreateFrotaAbastecimentoDto {
  media: number;
  @IsNumber()
  userId: number;
  veiculoId: number;
  kmAt: number;
  litros: number;
  mes: number;
}
