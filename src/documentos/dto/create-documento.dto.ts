import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDocumentoDto {
  @IsNumber()
  tipoId: number;
  @IsNumber()
  userId: number;
  @IsNumber()
  setorId: number;
  @IsString()
  titulo: string;
  @IsString()
  codigo: string;
  @IsString()
  ano: string;
  @IsBoolean()
  isInterno: boolean;
  @IsOptional()
  @IsNumber()
  id: number;
  @IsString()
  status: string;
}
