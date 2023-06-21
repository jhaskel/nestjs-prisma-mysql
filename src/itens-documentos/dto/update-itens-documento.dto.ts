import { PartialType } from '@nestjs/mapped-types';
import { CreateItensDocumentoDto } from './create-itens-documento.dto';

export class UpdateItensDocumentoDto extends PartialType(CreateItensDocumentoDto) {}
