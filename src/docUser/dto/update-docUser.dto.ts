import { PartialType } from '@nestjs/mapped-types';
import { CreateDocUserDto } from './create-docUser.dto';


export class UpdateDocUserDto extends PartialType(CreateDocUserDto) {}
