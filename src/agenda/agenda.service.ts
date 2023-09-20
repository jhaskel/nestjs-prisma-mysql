import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAgendaIniDto } from './dto/update-agenda_init_dto';

@Injectable()
export class AgendaService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAgendaDto) {
    return this.prisma.agenda.create({
      data,
    });
  }

  async findAll() {
    const dados = await this.prisma.agenda.findMany({
      include: {
        users: { select: { setores: { select: { name: true, id: true } } } },
      },
    });

    const reduced = [];

    dados.forEach((item) => {
      const duplicated =
        reduced.findIndex((redItem) => {
          return item.users.setores.id == redItem.users.setores.id;
        }) > -1;

      if (!duplicated) {
        reduced.push(item);
      }
    });

    return reduced;
  }

  async findOne(id: number) {
    await this.existsUser(id);
    return this.prisma.agenda.findUnique({
      where: { userId: id },
      include: {
        users: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
  }

  async findBySetor(id: number) {
    return this.prisma.agenda.findMany({
      where: { users: { setorId: id } },
      include: {
        users: { select: { name: true, image: true } },
      },
    });
  }

  async update(id: number, data: UpdateAgendaDto) {
    if (!data.modifiedAt) {
      data.modifiedAt = new Date().toISOString();
    }

    await this.exists(id);
    return this.prisma.agenda.update({
      where: { id },
      data: data,
    });
  }

  async updateInit(id: number, data: UpdateAgendaIniDto) {
    await this.exists(id);
    const dados = await this.prisma.agenda.update({
      where: { id: id },
      data: data,
    });
    console.log('dados ' + dados.situacao_default);

    return {
      success: true,
      message: 'Veículo adicionado  com sucesso',
      data: dados,
    };
  }

  async remove(id: number) {
    await this.exists(id);
    return this.prisma.agenda.delete({ where: { id } });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.agenda.count({
        where: { id },
      }))
    )
      throw new NotFoundException(`Compromisso com id ${id} não existe`);
  }

  async existsUser(id: number) {
    if (
      !(await this.prisma.agenda.count({
        where: { userId: id },
      }))
    )
      throw new NotFoundException(`Compromisso com id ${id} não existe`);
  }
}
