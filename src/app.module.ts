import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SetorModule } from './setores/setor.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';


@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot({
      limit:100,// 10 vezes em 1 segundo
      ttl:60,      //equivale a 1 segundo
      ignoreUserAgents:[/googlebot/gi]

    }),
    forwardRef(()=>UserModule),
    forwardRef(()=>AuthModule),
    SetorModule,
    MailerModule.forRoot({
      transport: {
      
          host: 'smtp.ethereal.email',
          port: 587,
          auth: {
              user: 'bulah.corkery80@ethereal.email',
              pass: 'kX5dPdnEYBc1m1GGVM'
          }
      
      },
      defaults: {
        from: '"2bitsw" <bulah.corkery80@ethereal.email>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  
  ],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_GUARD, useClass:ThrottlerGuard
  }],
})
export class AppModule {}
