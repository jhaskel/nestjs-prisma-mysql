import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItensDocumentosService } from './itens-documentos.service';
import { CreateItensDocumentoDto } from './dto/create-itens-documento.dto';
import { UpdateItensDocumentoDto } from './dto/update-itens-documento.dto';

@Controller('itens')
export class ItensDocumentosController {
  constructor(private readonly itensDocumentosService: ItensDocumentosService) {}

  @Post()
  create(@Body() createItensDocumentoDto: CreateItensDocumentoDto) {
    return this.itensDocumentosService.create(createItensDocumentoDto);
  }

  @Get()
  findAll() {
    return this.itensDocumentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itensDocumentosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItensDocumentoDto: UpdateItensDocumentoDto) {
    return this.itensDocumentosService.update(+id, updateItensDocumentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itensDocumentosService.remove(+id);
  }
}
