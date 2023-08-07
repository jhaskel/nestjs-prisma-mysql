import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentoDto } from './create-documento.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateDocumentoDto extends PartialType(CreateDocumentoDto) {
  @IsString()
  @IsOptional()
  updatedAt: string;
}
