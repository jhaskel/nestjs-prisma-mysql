import { Module } from '@nestjs/common';
import { DeclaracaoService } from './declaracao.service';
import { DeclaracaoController } from './declaracao.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DeclaracaoController],
  providers: [DeclaracaoService],
})
export class DeclaracaoModule {}
