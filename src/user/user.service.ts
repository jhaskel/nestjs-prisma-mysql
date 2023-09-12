import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './DTO/create-user-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutUserDto } from './DTO/update-put-user-dto';
import { UpdatePatchUserDto } from './DTO/update-patch-user-dto';
import * as bcrypt from 'bcrypt';

import { CreateAgendaDto } from 'src/agenda/dto/create-agenda.dto';
import { AgendaService } from 'src/agenda/agenda.service';
import { UpdatePutUserDto1 } from './DTO/update-put-user-dto1';
import { UpdatePutUserDtoSetor } from './DTO/update-put-user-dto_setor';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,

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

    data.password = '123'; //senha padrão pra usuario = 123
    data.role = 2;
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

    console.log(data.password);

    const dado = await this.prisma.user.create({
      data,
    });

    const data2 = {
      id: dado.id,
      name: dado.name,
      email: dado.email,
      role: dado.role,
      image: dado.image,
      fone: dado.fone,
      matricula: dado.matricula,
      setorId: dado.setorId,
    };

    //cadastra no agenda
    const dados3: CreateAgendaDto = {
      userId: dado.id,
      retornoAt: '0',
      situacao: 'Trabalhando',
      local: 'De costume',
      status: 'expediente',
    };

    await this.agendaService.create(dados3);

    //retorna dados da usuaruio criado
    return {
      success: true,
      message: 'Usuário Registrado',
      data: data2,
    };
  }

  async createRegister(data: CreateUserDto) {
    const dados = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
      include: {
        //    setoruser: { select: { setorId: true } },
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

    const dados3: CreateAgendaDto = {
      //   setorId: criar.idSetor,

      userId: criar.id,
      retornoAt: '',
      situacao: 'expediente',
      local: 'de costume',
      status: 'expediente',
    };

    //cadastra no agenda
    await this.agendaService.create(dados3);

    return criar;
  }

  async list() {
    console.log('JOao Haskel');
    return this.prisma.user.findMany({
      include: {
        setores: { select: { id: true, name: true } },
      },
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
        secretario: {
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

  async update(id: number, data: UpdatePutUserDto1) {
    await this.exists(id);

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

  async updateSetor(id: number, data: UpdatePutUserDtoSetor) {
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

  async update2(id: number, data: UpdatePutUserDto) {
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
