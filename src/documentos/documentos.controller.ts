import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';

@Controller('documentos')
export class DocumentosController {
  constructor(private readonly documentosService: DocumentosService) {}

  @Post()
  create(@Body() createDocumentoDto: CreateDocumentoDto) {
    return this.documentosService.create(createDocumentoDto);
  }

  @Get()
  findAll() {
    return this.documentosService.findAll();
  }

  @Get('findByUser/:id')
  findByUser(@Param('id') id: string) {
    return this.documentosService.findByUser(+id);
  }
  @Get('findByUserFav/:id')
  findByUserFav(@Param('id') id: string) {
    return this.documentosService.findByUserFav(+id);
  }

  @Get('findByUserSearch/:id/:txt')
  findByUserSearch(@Param('id') id: string, @Param('txt') txt: string) {
    return this.documentosService.findByUserSearch(+id, txt);
  }

  @Get('countByUser/:id')
  countByUser(@Param('id') id: string) {
    return this.documentosService.countByUser(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentosService.findOne(+id);
  }

  @Get(':id')
  findUser(@Param('id') id: string) {
    return this.documentosService.findUser(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentoDto: UpdateDocumentoDto,
  ) {
    return this.documentosService.update(+id, updateDocumentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentosService.remove(+id);
  }
}
