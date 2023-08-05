import { IsEmail, IsString } from 'class-validator';

export class CreateSetorDto {
  @IsString()
  name: string;
  @IsString()
  secretario: string;
  @IsString()
  sigla: string;
  @IsEmail()
  email: string;
  @IsString()
  responsavel: string;
  @IsString()
  image: string;
}
