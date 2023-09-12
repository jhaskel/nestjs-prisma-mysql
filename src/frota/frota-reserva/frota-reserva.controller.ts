import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { FrotaReservaService } from './frota-reserva.service';
import { CreateFrotaReservaDto } from './dto/create-frota-reserva.dto';
import { UpdateFrotaReservaDto } from './dto/update-frota-reserva.dto';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';

import { RoleGuard } from 'src/guards/role.guard';

//@UseGuards(RoleGuard)
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

  @Get('findByVeiculo/:id')
  findByVeiculo(@Param('id') id: string) {
    return this.frotaReservaService.findByVeiculo(+id);
  }

  @Get('findByUser/:id')
  findByUser(@Param('id') id: string) {
    return this.frotaReservaService.findByUser(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.frotaReservaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFrotaReservaDto: UpdateFrotaReservaDto,
  ) {
    return this.frotaReservaService.update(+id, updateFrotaReservaDto);
  }

  @Put(':id')
  updateAtivo(@Param('id') id: string, @Body() data) {
    return this.frotaReservaService.updateAtivo(data);
  }

  @Roles(Role.SuperAdmin)
  @Put('status/:id')
  updateStatus(@Param('id') id: string, @Body() data) {
    return this.frotaReservaService.updateStatus(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.frotaReservaService.remove(+id);
  }
}
