import { Module } from '@nestjs/common';
import { SetorUserService } from './setor-user.service';
import { SetorUserController } from './setor-user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SetorUserController],
  providers: [SetorUserService],
  exports: [SetorUserService],
})
export class SetorUserModule {}
