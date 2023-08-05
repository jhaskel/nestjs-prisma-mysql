import { Module } from '@nestjs/common';
import { FavoritosService } from './favoritos.service';
import { FavoritosController } from './favoritos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DocUserService } from 'src/docUser/docUser.service';

@Module({
  imports: [PrismaModule],
  controllers: [FavoritosController],
  providers: [FavoritosService, DocUserService],
})
export class FavoritosModule {}
