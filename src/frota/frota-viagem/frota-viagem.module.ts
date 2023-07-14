import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';

import { FrotaViagemService } from './frota-viagem.service';
import { FrotaViagemController } from './frota-viagem.controller';
import { FrotaVeiculosService } from '../frota-veiculos/frota-veiculos.service';
import { FrotaVeiculoUserService } from '../frota-veiculo-user/frota-veiculo-user.service';

@Module({
  imports:[PrismaModule],
  controllers: [FrotaViagemController],
  providers: [FrotaViagemService,FrotaVeiculosService,FrotaVeiculoUserService]
})
export class FrotaViagemModule {}
