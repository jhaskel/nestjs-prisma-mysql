import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DocUserService } from './docUser.service';
import { CreateDocUserDto } from './dto/create-docUser.dto';
@Controller('docuser')
export class DocUserController {
  constructor(private readonly docUserService: DocUserService) {}

  @Post()
  create(@Body() createDocUserDto: CreateDocUserDto) {
    console.log(createDocUserDto);
    return this.docUserService.create(createDocUserDto);
  }

  @Get()
  findAll() {
    return this.docUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.docUserService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.docUserService.remove(+id);
  }
}
