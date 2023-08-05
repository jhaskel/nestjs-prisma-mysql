import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
      include: { setores: { select: { id: true, name: true } } },
    });

    const reduced = [];

    dados.forEach((item) => {
      const duplicated =
        reduced.findIndex((redItem) => {
          return item.setorId == redItem.setorId;
        }) > -1;

      if (!duplicated) {
        reduced.push(item);
      }
    });

    return reduced;
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.agenda.findUnique({
      where: { id },
    });
  }

  async findBySetor(id: number) {
    await this.existsSetor(id);
    return this.prisma.agenda.findMany({
      where: { setorId: id },
      include: {
        users: { select: { name: true, image: true } },
        setores: { select: { name: true, id: true } },
      },
    });
  }

  async update(id: number, data: UpdateAgendaDto) {
    await this.exists(id);
    return this.prisma.agenda.update({
      where: { id },
      data: data,
    });
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

  async existsSetor(id: number) {
    if (
      !(await this.prisma.agenda.count({
        where: { setorId: id },
      }))
    )
      throw new NotFoundException(`Compromisso com id ${id} não existe`);
  }
}
