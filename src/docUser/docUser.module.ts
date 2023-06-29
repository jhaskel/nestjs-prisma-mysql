import { Module } from '@nestjs/common';


import { PrismaModule } from 'src/prisma/prisma.module';
import { DocUserService } from './docUser.service';
import { DocUserController } from './docUser.controller';

@Module({
  imports:[PrismaModule],
  controllers: [DocUserController],
  providers: [DocUserService],
  exports:[DocUserModule]
})
export class DocUserModule {}
