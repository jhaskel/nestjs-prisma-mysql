import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateConfigDto {
  @IsOptional()
  @IsString()
  logo: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  cnpj: string;

  @IsString()
  endereco: string;

  @IsString()
  site: string;

  @IsString()
  fone: string;

  @IsEmail()
  email: string;
}
