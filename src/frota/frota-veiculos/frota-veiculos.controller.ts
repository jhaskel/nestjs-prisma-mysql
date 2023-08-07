import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FrotaVeiculosService } from './frota-veiculos.service';
import { CreateFrotaVeiculoDto } from './dto/create-frota-veiculo.dto';
import { UpdateFrotaVeiculoDto } from './dto/update-frota-veiculo.dto';

@Controller('veiculos')
export class FrotaVeiculosController {
  constructor(private readonly frotaVeiculosService: FrotaVeiculosService) {}

  @Post()
  create(@Body() createFrotaVeiculoDto: CreateFrotaVeiculoDto) {
    return this.frotaVeiculosService.create(createFrotaVeiculoDto);
  }

  @Get()
  findAll() {
    return this.frotaVeiculosService.findAll();
  }

  @Get('findBySetor/:id')
  findByUser(@Param('id') id: string) {
    console.log('jjjjjjjjjjj' + id);
    return this.frotaVeiculosService.findBySetor(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.frotaVeiculosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFrotaVeiculoDto: UpdateFrotaVeiculoDto,
  ) {
    return this.frotaVeiculosService.update(+id, updateFrotaVeiculoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.frotaVeiculosService.remove(+id);
  }
}
