import { IsNumber, IsString } from 'class-validator';

export class CreateFrotaVeiculoDto {
  @IsNumber()
  km: number;

  @IsString()
  name: string;
  placa: string;
  image: string;
}
