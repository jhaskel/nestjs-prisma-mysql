import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FrotaVeiculoUserService } from './frota-veiculo-user.service';
import { CreateFrotaVeiculoUserDto } from './dto/create-frota-veiculo-user.dto';
import { UpdateFrotaVeiculoUserDto } from './dto/update-frota-veiculo-user.dto';

@Controller('veiculoUser')
export class FrotaVeiculoUserController {
  constructor(
    private readonly frotaVeiculoUserService: FrotaVeiculoUserService,
  ) {}

  @Post()
  create(@Body() createFrotaVeiculoUserDto: CreateFrotaVeiculoUserDto) {
    console.log('Chegando');
    return this.frotaVeiculoUserService.create(createFrotaVeiculoUserDto);
  }

  @Get()
  findAll() {
    return this.frotaVeiculoUserService.findAll();
  }

  @Get('findByUser/:id')
  findByUser(@Param('id') id: string) {
    return this.frotaVeiculoUserService.findByUser(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.frotaVeiculoUserService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFrotaVeiculoUserDto: UpdateFrotaVeiculoUserDto,
  ) {
    return this.frotaVeiculoUserService.update(+id, updateFrotaVeiculoUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.frotaVeiculoUserService.remove(+id);
  }
}
