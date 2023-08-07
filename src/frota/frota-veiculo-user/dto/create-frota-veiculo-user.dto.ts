import { IsNumber } from 'class-validator';

export class CreateFrotaVeiculoUserDto {
  @IsNumber()
  userId: number;
  veiculoId: number;
}
