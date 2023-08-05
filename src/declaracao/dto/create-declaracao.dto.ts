import { IsNumber, IsString } from 'class-validator';

export class CreateDeclaracaoDto {
  @IsNumber()
  documentoId: number;
  @IsString()
  destinatario: string;
  @IsString()
  setor: string;
  @IsString()
  assunto: string;
  @IsString()
  descricao: string;
  @IsNumber()
  codigo: number;
  @IsNumber()
  ano: number;
  @IsString()
  assign: string;
  @IsString()
  cargo: string;
  @IsString()
  matricula: string;
}
