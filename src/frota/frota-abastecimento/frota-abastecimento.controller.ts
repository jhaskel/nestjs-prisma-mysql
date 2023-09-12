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

  @Get('findByVeiculo/:id/:ano/:mes')
  findByVeiculo(
    @Param('id') id: string,
    @Param('ano') ano: string,
    @Param('mes') mes: string,
  ) {
    console.log('jjkasdjksajk');

    return this.frotaAbastecimentoService.findByVeiculo(+id, +ano, +mes);
  }

  @Get('findByVeiculoByMes/:id/:ano')
  findByVeiculoByMes(@Param('id') id: string, @Param('ano') ano: string) {
    console.log('jjkasdjksajk');

    return this.frotaAbastecimentoService.findByVeiculoByMes(+id, +ano);
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
