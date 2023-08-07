import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FrotaAbastecimentoService } from './frota-abastecimento.service';
import { CreateFrotaAbastecimentoDto } from './dto/create-frota-abastecimento.dto';
import { UpdateFrotaAbastecimentoDto } from './dto/update-frota-abastecimento.dto';

@Controller('abastecimento')
export class FrotaAbastecimentoController {
  constructor(
    private readonly frotaAbastecimentoService: FrotaAbastecimentoService,
  ) {}

  @Post()
  create(@Body() createFrotaAbastecimentoDto: CreateFrotaAbastecimentoDto) {
    return this.frotaAbastecimentoService.create(createFrotaAbastecimentoDto);
  }

  @Get()
  findAll() {
    return this.frotaAbastecimentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.frotaAbastecimentoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFrotaAbastecimentoDto: UpdateFrotaAbastecimentoDto,
  ) {
    return this.frotaAbastecimentoService.update(
      +id,
      updateFrotaAbastecimentoDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.frotaAbastecimentoService.remove(+id);
  }
}
