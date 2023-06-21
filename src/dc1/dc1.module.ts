import { Module } from '@nestjs/common';
import { Dc1Service } from './dc1.service';
import { Dc1Controller } from './dc1.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[PrismaModule,AuthModule,UserModule],
  controllers: [Dc1Controller],
  providers: [Dc1Service]
})
export class Dc1Module {}
