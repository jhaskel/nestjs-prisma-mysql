import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersCargosService } from './users-cargos.service';
import { CreateUsersCargoDto } from './dto/create-users-cargo.dto';
import { UpdateUsersCargoDto } from './dto/update-users-cargo.dto';

@Controller('userscargos')
export class UsersCargosController {
  constructor(private readonly usersCargosService: UsersCargosService) {}

  @Post()
  create(@Body() createUsersCargoDto: CreateUsersCargoDto) {
    return this.usersCargosService.create(createUsersCargoDto );
  }



  @Get()
  findAll() {
    return this.usersCargosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersCargosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateUsersCargoDto) {
    return this.usersCargosService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersCargosService.remove(+id);
  }
}
