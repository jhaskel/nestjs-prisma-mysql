import { IsEmail, IsString } from 'class-validator';

export class CreateSetorDto {
  @IsString()
  name: string;
  @IsString()
  sigla: string;
  @IsEmail()
  email: string;
  @IsString()
  image: string;
}
