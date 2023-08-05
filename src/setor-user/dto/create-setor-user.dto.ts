import { IsNumber } from 'class-validator';

export class CreateSetorUserDto {
  @IsNumber()
  setorId: number;
  userId: number;
}
