import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { FrotaViagemService } from './frota-viagem.service';
import { CreateFrotaViagemDto } from './dto/create-frota-viagem.dto';
import { UpdateFrotaViagemDto } from './dto/update-frota-viagem.dto';

import { FrotaVeiculosService } from '../frota-veiculos/frota-veiculos.service';
import { FrotaVeiculoUserService } from '../frota-veiculo-user/frota-veiculo-user.service';
import { FrotaReservaService } from '../frota-reserva/frota-reserva.service';

@Controller('frotaViagem')
export class FrotaViagemController {
  constructor(
    private readonly frotaViagemService: FrotaViagemService,
    private readonly frotaVeiculoService: FrotaVeiculosService,
    private readonly frotaVeiculoUserService: FrotaVeiculoUserService,
    private readonly frotaReservaService: FrotaReservaService,
  ) {}

  @Post()
  async create(@Body() createFrotaViagemDto: CreateFrotaViagemDto) {
    const dados = await this.frotaViagemService.create(createFrotaViagemDto);

    //altera status do veiculo
    const dataVeiculo = {
      id: dados.data.veiculoId,
      isViagem: true,
    };
    if (dados) {
      await this.frotaVeiculoService.updateStatus(dataVeiculo);
    }

    return dados;
  }

  @Get()
  findAll() {
    return this.frotaViagemService.findAll();
  }

  @Get('findByVeiculo/:id/:ano/:mes')
  findByVeiculo(
    @Param('id') id: string,
    @Param('ano') ano: string,
    @Param('mes') mes: string,
  ) {
    console.log('jjkasdjksajk');

    return this.frotaViagemService.findByVeiculo(+id, +ano, +mes);
  }

  @Get('findByVeiculoByMes/:id/:ano')
  findByVeiculoByMes(@Param('id') id: string, @Param('ano') ano: string) {
    console.log('jjkasdjksajk');

    return this.frotaViagemService.findByVeiculoByMes(+id, +ano);
  }

  @Get('findByUser/:id')
  findByUser(@Param('id') id: string) {
    return this.frotaViagemService.findByUser(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.frotaViagemService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFrotaViagemDto: UpdateFrotaViagemDto,
  ) {
    const dados = await this.frotaViagemService.update(
      +id,
      updateFrotaViagemDto,
    );
    //altera status do veiculo
    const dataVeiculo = {
      id: dados.data.veiculoId,
      isViagem: false,
      km: dados.data.kmFinal,
    };
    if (dados) {
      await this.frotaVeiculoService.updateStatus(dataVeiculo);
    }

    //altera status da reserva do veiculo
    if (dados.data.reservaId != null) {
      const dataFrotaReserva = {
        id: dados.data.reservaId,
        isAtivo: false,
      };

      if (dados) {
        this.frotaReservaService.updateIsAtivo(dataFrotaReserva);
      }
    }

    return dados;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.frotaViagemService.remove(+id);
  }
}
