import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { Dc1Service } from './dc1.service';
import { CreateDc1Dto } from './dto/create-dc1.dto';
import { UpdateDc1Dto } from './dto/update-dc1.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { User } from 'src/decorators/user-decorator ';

@UseGuards(AuthGuard)
@Controller('dc')
export class Dc1Controller {
  constructor(private readonly dc1Service: Dc1Service) {}

  @Post()
  create(@Body() createDc1Dto: CreateDc1Dto) {
    return this.dc1Service.create(createDc1Dto);
  }

  @Get()
  findAll() {
    return this.dc1Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string,) {
    return this.dc1Service.findOne(+id,);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDc1Dto: UpdateDc1Dto) {
    return this.dc1Service.update(+id, updateDc1Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dc1Service.remove(+id);
  }
}
