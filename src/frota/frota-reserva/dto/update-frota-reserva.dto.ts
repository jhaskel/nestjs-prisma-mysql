import { PartialType } from '@nestjs/mapped-types';
import { CreateFrotaReservaDto } from './create-frota-reserva.dto';

export class UpdateFrotaReservaDto extends PartialType(CreateFrotaReservaDto) {}
