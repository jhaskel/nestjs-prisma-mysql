import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { userIdCheckMiddleware } from 'src/middlewares/user-id-check-middleware';
import { AuthModule } from 'src/auth/auth.module';
import { SetorUserModule } from 'src/setor-user/setor-user.module';

import { AgendaModule } from 'src/agenda/agenda.module';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    SetorUserModule,
    AgendaModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(userIdCheckMiddleware).forRoutes({
      path: 'users/:id',
      method: RequestMethod.ALL,
    });
  }
}
