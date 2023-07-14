import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FrotaReservaService } from './frota-reserva.service';
import { CreateFrotaReservaDto } from './dto/create-frota-reserva.dto';
import { UpdateFrotaReservaDto } from './dto/update-frota-reserva.dto';

@Controller('frotaReserva')
export class FrotaReservaController {
  constructor(private readonly frotaReservaService: FrotaReservaService) {}

  @Post()
  create(@Body() createFrotaReservaDto: CreateFrotaReservaDto) {
    return this.frotaReservaService.create(createFrotaReservaDto);
  }

  @Get()
  findAll() {
    return this.frotaReservaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.frotaReservaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFrotaReservaDto: UpdateFrotaReservaDto) {
    return this.frotaReservaService.update(+id, updateFrotaReservaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.frotaReservaService.remove(+id);
  }
}
