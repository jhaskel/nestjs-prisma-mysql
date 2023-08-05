import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateFrotaViagemDto {
  @IsNumber()
  userId: number;
  reservaId: number;
  veiculoId: number;
  veiculoUserId: number;
  kmInicial: number;
  @IsString()
  destino: string;
  motivo: string;
  @IsBoolean()
  isAtiva: boolean;
}
