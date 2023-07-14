import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FrotaViagemService } from './frota-viagem.service';
import { CreateFrotaViagemDto } from './dto/create-frota-viagem.dto';
import { UpdateFrotaViagemDto } from './dto/update-frota-viagem.dto';
import { UpdateFrotaVeiculoDto } from '../frota-veiculos/dto/update-frota-veiculo.dto';
import { StatusVeiculo } from 'src/enums/status-veiculos.enum';
import { FrotaVeiculosService } from '../frota-veiculos/frota-veiculos.service';
import { FrotaVeiculoUserService } from '../frota-veiculo-user/frota-veiculo-user.service';


@Controller('frotaViagem')
export class FrotaViagemController {
  constructor(
    private readonly frotaViagemService: FrotaViagemService,
    private readonly frotaVeiculoService: FrotaVeiculosService,
    private readonly frotaVeiculoUserService: FrotaVeiculoUserService) {}

  @Post()
  async create(@Body() createFrotaViagemDto: CreateFrotaViagemDto) {

    const dados = await this.frotaViagemService.create(createFrotaViagemDto);
    //altera status do veiculo
    const dataVeiculo={    
      id:dados.veiculoId,
      status:StatusVeiculo.viagem
  }
  this.frotaVeiculoService.updateStatus(dataVeiculo);

  //altera status do veiculoUser se for mesmo usuário
  const dataVeiculoUser={    
    id:dados.veiculoId,
    status:StatusVeiculo.viagem,
    userId:dados.userId
}
this.frotaVeiculoUserService.updateIsOcupando(dataVeiculoUser);
     
     return dados;
  }

  @Get()
  findAll() {
    return this.frotaViagemService.findAll();
  }

  @Get('findByVeiculo/:id')
  findByUserFav(@Param('id') id: string) {
    return this.frotaViagemService.findByVeiculo(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.frotaViagemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFrotaViagemDto: UpdateFrotaViagemDto) {
    return this.frotaViagemService.update(+id, updateFrotaViagemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.frotaViagemService.remove(+id);
  }
}
