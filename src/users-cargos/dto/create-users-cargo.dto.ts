import { IsNumber, IsString } from 'class-validator';

export class CreateUsersCargoDto {
  @IsNumber()
  userId: number;
  @IsString()
  name: string;
}
