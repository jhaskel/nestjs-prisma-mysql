import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersCargoDto } from './create-users-cargo.dto';

export class UpdateUsersCargoDto extends PartialType(CreateUsersCargoDto) {}
