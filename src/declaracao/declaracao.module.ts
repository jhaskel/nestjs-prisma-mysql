import { Module } from '@nestjs/common';
import { DeclaracaoService } from './declaracao.service';
import { DeclaracaoController } from './declaracao.controller';

@Module({
  controllers: [DeclaracaoController],
  providers: [DeclaracaoService]
})
export class DeclaracaoModule {}
