import { PartialType } from '@nestjs/mapped-types';
import { CreateDocUserDto } from './create-docUser.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDocUserDto extends PartialType(CreateDocUserDto) {
  @IsString()
  @IsOptional()
  updatedAt: string;
}
