import {
  Body,
  Controller,
  Get,
  Patch,
  Put,
  Post,
  Delete,
} from '@nestjs/common';
import { CreateSetorDto } from './DTO/create-setor-dto';
import { UpdatePutSetorDto } from './DTO/update-put-setor-dto';
import { UpdatePatchSetorDto } from './DTO/update-patch-setor-dto';
import { SetorService } from './setor.service';

import { ParamId } from 'src/decorators/param-id-decorator';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

//@UseInterceptors(LogInterceptor)
@Controller('setores')
export class SetorController {
  constructor(private readonly setorService: SetorService) {}

  // @UseInterceptors(LogInterceptor)
  @Post()
  async create(@Body() data: CreateSetorDto) {
    return this.setorService.create(data);
  }

  @SkipThrottle() //ignorar força bruta
  @Get()
  async list() {
    return this.setorService.list();
  }

  @Throttle(500, 60) //sobrescreve a força bruta padrão
  @Get(':id')
  async show(@ParamId() id: number) {
    return this.setorService.show(id);
  }

  @Get('findByUser/:id')
  async findByUser(@ParamId() id: number) {
    return this.setorService.findByUser(id);
  }

  @Put(':id')
  async update(@Body() data: UpdatePutSetorDto, @ParamId() id: number) {
    return this.setorService.update(id, data);
  }

  @Patch(':id')
  async updatePartial(
    @Body() data: UpdatePatchSetorDto,
    @ParamId() id: number,
  ) {
    return this.setorService.updatePartial(id, data);
  }
  @Delete(':id')
  async delete(@ParamId() id: number) {
    return this.setorService.delete(id);
  }
}
