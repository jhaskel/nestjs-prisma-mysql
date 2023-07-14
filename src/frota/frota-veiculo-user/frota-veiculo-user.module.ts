import { Module } from '@nestjs/common';
import { FrotaVeiculoUserService } from './frota-veiculo-user.service';
import { FrotaVeiculoUserController } from './frota-veiculo-user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [FrotaVeiculoUserController],
  providers: [FrotaVeiculoUserService],
  exports:[FrotaVeiculoUserService]
})
export class FrotaVeiculoUserModule {}
