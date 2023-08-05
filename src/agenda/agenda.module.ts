import { Module } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { AgendaController } from './agenda.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AgendaController],
  providers: [AgendaService],
  imports: [PrismaModule],
  exports: [AgendaService],
})
export class AgendaModule {}
