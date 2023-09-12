import {
  IsEmail,
  IsEnum,
  IsNotIn,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UpdatePutUserDtoSetor {
  updatedAt;
  @IsNumber()
  setorId: number;
  role: number;
}
