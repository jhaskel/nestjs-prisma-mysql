import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeclaracaoService } from './declaracao.service';
import { CreateDeclaracaoDto } from './dto/create-declaracao.dto';
import { UpdateDeclaracaoDto } from './dto/update-declaracao.dto';

@Controller('declaracao')
export class DeclaracaoController {
  constructor(private readonly declaracaoService: DeclaracaoService) {}

  @Post()
  create(@Body() createDeclaracaoDto: CreateDeclaracaoDto) {
    return this.declaracaoService.create(createDeclaracaoDto);
  }

  @Get()
  findAll() {
    return this.declaracaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.declaracaoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeclaracaoDto: UpdateDeclaracaoDto) {
    return this.declaracaoService.update(+id, updateDeclaracaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.declaracaoService.remove(+id);
  }
}
