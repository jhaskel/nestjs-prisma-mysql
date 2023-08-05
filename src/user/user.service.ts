import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './DTO/create-user-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDto } from './DTO/update-put-user-dto';
import { UpdatePatchUserDto } from './DTO/update-patch-user-dto';
import * as bcrypt from 'bcrypt';

import { SetorUserService } from 'src/setor-user/setor-user.service';

import { CreateAgendaDto } from 'src/agenda/dto/create-agenda.dto';
import { AgendaService } from 'src/agenda/agenda.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly setorUserService: SetorUserService,
    private readonly agendaService: AgendaService,
  ) {}

  async create(data: CreateUserDto) {
    const dados = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (dados) {
      throw new NotFoundException(
        `O usuário ${data.email} já está sendo usado`,
      );
    }

    data.password = data.password;
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

    const dado = await this.prisma.user.create({
      data,
    });

    console.log(dado.id);

    const data2 = {
      id: dado.id,
      name: dado.name,
      email: dado.email,
      role: dado.role,
      image: dado.image,
      fone: dado.fone,

      matricula: dado.matricula,
    };
    return {
      success: true,
      message: 'Usuário Autenticado',
      data: data2,
    };
  }
  async createRegister(data: CreateUserDto) {
    const dados = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
      include: {
        setoruser: { select: { setorId: true } },
      },
    });

    if (dados) {
      throw new NotFoundException(
        `O usuário ${data.email} já está sendo usado`,
      );
    }

    data.password = data.password;
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

    const criar = await this.prisma.user.create({
      data,
    });
    console.log(criar.id);

    const dados2 = {
      setorId: criar.idSetor,
      userId: criar.id,
    };
    //cadastra no setoruser
    await this.setorUserService.create(dados2);

    const dados3: CreateAgendaDto = {
      setorId: criar.idSetor,
      userId: criar.id,
      retornoAt: new Date(),
      situacao: '',
      local: '',
    };

    //cadastra no agenda
    await this.agendaService.create(dados3);

    return criar;
  }

  async list() {
    return this.prisma.user.findMany({
      orderBy: [
        {
          name: 'asc',
        },
        {
          id: 'asc',
        },
      ],
    });
  }

  async show(id: number) {
    await this.exists(id);
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        setores: {
          select: {
            name: true,
            id: true,
          },
        },
        usercargos: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
  }

  async show2(id: number) {
    await this.exists(id);
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, data: UpdatePutUserDto) {
    await this.exists(id);
    const salt = await bcrypt.genSalt();

    data.password = await bcrypt.hash(data.password, salt);
    if (!data.updatedAt) {
      data.updatedAt = new Date().toISOString();
    }
    return this.prisma.user.update({
      data,
      where: {
        id: id,
      },
    });
  }

  async updatePartial(id: number, data: UpdatePatchUserDto) {
    await this.exists(id);
    const salt = await bcrypt.genSalt();
    if (data.password) {
      data.password = await bcrypt.hash(data.password, salt);
    }

    if (!data.updatedAt) {
      data.updatedAt = new Date().toISOString();
    }

    return this.prisma.user.update({
      data,
      where: {
        id: id,
      },
    });
  }

  async delete(id: number) {
    await this.exists(id);

    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.user.count({
        where: { id },
      }))
    )
      throw new NotFoundException(`O usuário ${id} não existe`);
  }
}
