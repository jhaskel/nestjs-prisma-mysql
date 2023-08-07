import { Module } from '@nestjs/common';
import { FrotaReservaService } from './frota-reserva.service';
import { FrotaReservaController } from './frota-reserva.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from 'src/user/user.service';
import { SetorUserService } from 'src/setor-user/setor-user.service';
import { AgendaService } from 'src/agenda/agenda.service';

@Module({
  imports: [PrismaModule],
  controllers: [FrotaReservaController],
  providers: [
    FrotaReservaService,
    UserService,
    SetorUserService,
    AgendaService,
  ],
  exports: [FrotaReservaService],
})
export class FrotaReservaModule {}
