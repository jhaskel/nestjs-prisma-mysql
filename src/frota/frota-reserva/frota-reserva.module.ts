import { Module } from '@nestjs/common';
import { FrotaReservaService } from './frota-reserva.service';
import { FrotaReservaController } from './frota-reserva.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [FrotaReservaController],
  providers: [FrotaReservaService]
})
export class FrotaReservaModule {}
