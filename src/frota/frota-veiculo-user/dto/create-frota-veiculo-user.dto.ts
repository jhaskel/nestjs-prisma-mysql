import { IsBoolean, IsNumber } from 'class-validator';

export class CreateFrotaVeiculoUserDto {
  @IsNumber()
  userId: number;
  veiculoId: number;
  @IsBoolean()
  isTitular: boolean;
  isAtivo: boolean;
}
