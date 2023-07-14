import { Module } from '@nestjs/common';
import { FrotaAbastecimentoService } from './frota-abastecimento.service';
import { FrotaAbastecimentoController } from './frota-abastecimento.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [FrotaAbastecimentoController],
  providers: [FrotaAbastecimentoService]
})
export class FrotaAbastecimentoModule {}
