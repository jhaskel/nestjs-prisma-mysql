import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SetorUserService } from './setor-user.service';
import { CreateSetorUserDto } from './dto/create-setor-user.dto';
import { UpdateSetorUserDto } from './dto/update-setor-user.dto';

@Controller('setor-user')
export class SetorUserController {
  constructor(private readonly setorUserService: SetorUserService) {}

  @Post()
  create(@Body() createSetorUserDto: CreateSetorUserDto) {
    return this.setorUserService.create(createSetorUserDto);
  }

  @Get()
  findAll() {
    return this.setorUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.setorUserService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSetorUserDto: UpdateSetorUserDto,
  ) {
    return this.setorUserService.update(+id, updateSetorUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.setorUserService.remove(+id);
  }
}
