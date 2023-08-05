import { Module } from '@nestjs/common';
import { DocumentosService } from './documentos.service';
import { DocumentosController } from './documentos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

import { DocUserController } from 'src/docUser/docUser.controller';
import { DocUserService } from 'src/docUser/docUser.service';

@Module({
  imports: [PrismaModule],
  controllers: [DocumentosController, DocUserController],
  providers: [DocumentosService, DocUserService],
})
export class DocumentosModule {}
