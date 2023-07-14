import { PartialType } from '@nestjs/mapped-types';
import { CreateFrotaViagemDto } from './create-frota-viagem.dto';


export class UpdateFrotaViagemDto extends PartialType(CreateFrotaViagemDto) {}
