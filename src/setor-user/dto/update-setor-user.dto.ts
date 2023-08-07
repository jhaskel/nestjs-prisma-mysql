import { PartialType } from '@nestjs/mapped-types';
import { CreateSetorUserDto } from './create-setor-user.dto';

export class UpdateSetorUserDto extends PartialType(CreateSetorUserDto) {}
