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
import { ConfigsModule } from './configs/configs.module';
import { UsersCargosModule } from './users-cargos/users-cargos.module';
import { TiposModule } from './tipos/tipos.module';
import { DocumentosModule } from './documentos/documentos.module';
import { ItensDocumentosModule } from './itens-documentos/itens-documentos.module';
import { Dc1Module } from './dc1/dc1.module';







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
      
          host: 'smtp.gmail.com',
          port: 587,
          auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
          }
      
      },
      defaults: {
        from: '"2bitsw" <2bitsw@gmail.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
   ConfigsModule,
   UsersCargosModule,
   TiposModule,
   DocumentosModule,
   ItensDocumentosModule,
   Dc1Module,
   
   
    
  
  ],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_GUARD, useClass:ThrottlerGuard
  }],
})
export class AppModule {}
