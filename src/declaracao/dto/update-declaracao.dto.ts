import { PartialType } from '@nestjs/mapped-types';
import { CreateDeclaracaoDto } from './create-declaracao.dto';

export class UpdateDeclaracaoDto extends PartialType(CreateDeclaracaoDto) {}
