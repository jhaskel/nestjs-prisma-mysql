import {
  IsEmail,
  IsEnum,
  IsNotIn,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UpdatePutUserDto1 {
  @IsNumber()
  setorId: number;
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsOptional()
  @IsString()
  image: string;
  @IsOptional()
  @IsString()
  cargo: string;
  @IsOptional()
  @IsString()
  matricula: string;
  @IsOptional()
  @IsString()
  fone: string;
  @IsString()
  @IsOptional()
  updatedAt: string;
}
