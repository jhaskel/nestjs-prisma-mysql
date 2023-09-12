import { IsNumber } from 'class-validator';

export class UpdatePutUserDtoSetor {
  updatedAt;
  @IsNumber()
  setorId: number;
  role: number;
}
