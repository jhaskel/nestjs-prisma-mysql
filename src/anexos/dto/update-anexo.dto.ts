import { PartialType } from '@nestjs/mapped-types';
import { CreateAnexoDto } from './create-anexo.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAnexoDto extends PartialType(CreateAnexoDto) {
    @IsString()
    @IsOptional()
    updatedAt:string; 
}
