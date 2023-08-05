import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthRegisterDto } from './dto/aut-register-dto';

import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer/dist';

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience = 'users';
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly mailer: MailerService,
  ) {}

  createToken(user: User) {
    const token = {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          subject: String(user.id),
          expiresIn: '7 days',
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };

    return token.accessToken;
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience,
      });
      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }
  async login(matricula: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        matricula,
      },
      include: {
        setoruser: { select: { setorId: true } },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email corresponde!');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('senha não corresponde!');
    }

    const token = this.createToken(user);

    const data = {
      id: user.id,
      name: user.name,
      email: user.email,
      setores: user.setoruser,
      role: user.role,
      image: user.image,
      fone: user.fone,
      matricula: user.matricula,
      cargo: user.cargo,
      token: token,
    };
    return {
      success: true,
      message: 'Usuário Autenticado',
      data: data,
    };
  }

  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email está incorreto');
    }
    const token = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        subject: String(user.id),
        expiresIn: '30 minutes',
        issuer: 'forget',
        audience: 'users',
      },
    );

    await this.mailer.sendMail({
      subject: 'Recuperação de Senha',
      to: email,
      template: 'forget',
      context: {
        name: user.name,
        token,
      },
    });
    return true;
  }
  async reset(password: string, token: string) {
    try {
      const data: any = this.jwtService.verify(token, {
        issuer: 'forget',
        audience: 'users',
      });

      if (isNaN(Number(data.id))) {
        throw new BadRequestException('Token inválido');
      }

      const salt = await bcrypt.genSalt();

      password = await bcrypt.hash(password, salt);

      const user = await this.prisma.user.update({
        where: {
          id: Number(data.id),
        },
        data: {
          password,
        },
      });
      return this.createToken(user);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async register(data: AuthRegisterDto) {
    const user = await this.userService.createRegister(data);

    try {
      const token = this.createToken(user);
      const data2 = {
        id: user.id,
        name: user.name,
        email: user.email,
        idSetor: user.idSetor,
        role: user.role,
        image: user.image,
        fone: user.fone,
        matricula: user.matricula,
        cargo: user.cargo,
        token: token,
      };

      return {
        success: true,
        message: 'Usuário Autenticado',
        data: data2,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Não',
        error: error,
      };
    }
  }
}
