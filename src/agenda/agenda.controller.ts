import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { UpdateAgendaIniDto } from './dto/update-agenda_init_dto';

@Controller('agenda')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @Post()
  create(@Body() createAgendaDto: CreateAgendaDto) {
    return this.agendaService.create(createAgendaDto);
  }

  @Get()
  findAll() {
    return this.agendaService.findAll();
  }

  @Get('findBySetor/:id')
  findBySetor(@Param('id') id: string) {
    return this.agendaService.findBySetor(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('tempos moderno');
    return this.agendaService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAgendaDto: UpdateAgendaDto) {
    return this.agendaService.update(+id, updateAgendaDto);
  }
  @Put('init/:id')
  updateInit(
    @Param('id') id: string,
    @Body() updateAgendaDto: UpdateAgendaIniDto,
  ) {
    
    return this.agendaService.updateInit(+id, updateAgendaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agendaService.remove(+id);
  }
}
