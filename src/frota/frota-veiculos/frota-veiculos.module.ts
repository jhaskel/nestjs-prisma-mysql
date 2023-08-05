import { Module } from '@nestjs/common';
import { FrotaVeiculosService } from './frota-veiculos.service';
import { FrotaVeiculosController } from './frota-veiculos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FrotaVeiculosController],
  providers: [FrotaVeiculosService],
  exports: [FrotaVeiculosService],
})
export class FrotaVeiculosModule {}
