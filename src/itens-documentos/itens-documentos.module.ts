import { Module } from '@nestjs/common';
import { ItensDocumentosService } from './itens-documentos.service';
import { ItensDocumentosController } from './itens-documentos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [ItensDocumentosController],
  providers: [ItensDocumentosService]
})
export class ItensDocumentosModule {}
