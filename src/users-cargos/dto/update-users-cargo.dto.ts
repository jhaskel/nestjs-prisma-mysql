import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersCargoDto } from './create-users-cargo.dto';
import { IsBoolean } from 'class-validator';

export class UpdateUsersCargoDto extends PartialType(CreateUsersCargoDto) {
   
}
