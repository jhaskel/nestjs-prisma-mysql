import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class CreateUserDto {
  @IsNumber()
  setorId: number;
  @IsString()
  name: string;
  @IsEmail()
  email: string;

  @IsOptional()
  @IsStrongPassword({
    minLength: 3,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsEnum(Role)
  role: number;
  @IsOptional()
  @IsString()
  cargo: string;

  @IsOptional()
  @IsString()
  matricula: string;
  @IsOptional()
  @IsString()
  token: string;
  fone: string;
}
