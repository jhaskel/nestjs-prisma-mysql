import { Module } from '@nestjs/common';
import { UsersCargosService } from './users-cargos.service';
import { UsersCargosController } from './users-cargos.controller';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  imports:[PrismaModule],
  controllers: [UsersCargosController],
  providers: [UsersCargosService]
})
export class UsersCargosModule {}
