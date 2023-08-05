import { IsNumber, IsString } from 'class-validator';

export class CreateFrotaVeiculoDto {
  @IsNumber()
  setorId: number;
  km: number;
  litros: number;
  @IsString()
  marca: string;
  modelo: string;
  name: string;
  ano: string;
  placa: string;
  chassi: string;
  image: string;
}
