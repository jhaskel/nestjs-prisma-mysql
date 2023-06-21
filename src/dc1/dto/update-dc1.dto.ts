import { PartialType } from '@nestjs/mapped-types';
import { CreateDc1Dto } from './create-dc1.dto';

export class UpdateDc1Dto extends PartialType(CreateDc1Dto) {}
