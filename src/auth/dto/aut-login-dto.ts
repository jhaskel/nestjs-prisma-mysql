import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthLoginDto {
  @IsString()
  @MinLength(4)
  @MaxLength(4)
  matricula: string;

  @IsString()
  @MinLength(6)
  password: string;
}
