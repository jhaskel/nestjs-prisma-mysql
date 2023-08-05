import { IsNumber } from 'class-validator';

export class CreateFavoritoDto {
  @IsNumber()
  userId: number;
  @IsNumber()
  documentoId: number;
}
