import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSetorDto } from './DTO/create-setor-dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePutSetorDto } from './DTO/update-put-setor-dto';
import { UpdatePatchSetorDto } from './DTO/update-patch-setor-dto';

@Injectable()
export class SetorService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSetorDto) {
    const dados = await this.prisma.setor.create({
      data,
    });

    return {
      success: true,
      message: 'Setor Cadastrado',
      data: dados,
    };
  }
  async list() {
    return this.prisma.setor.findMany({
      include: {
        sector_secreatario: { select: { name: true } },
        setor_responsavel: { select: { name: true } },
      },
    });
  }

  async show(id: number) {
    await this.exists(id);
    return this.prisma.setor.findUnique({
      where: {
        id: id,
      },
      include: {
        sector_secreatario: { select: { name: true } },
        setor_responsavel: { select: { name: true } },
      },
    });
  }

  async findByUser(id: number) {
    await this.exists(id);
    return this.prisma.setor.findUnique({
      where: {
        id: id,
      },
      include: {
        sector_secreatario: { select: { name: true } },
        setor_responsavel: { select: { name: true } },
      },
    });
  }

  async update(id: number, data: UpdatePutSetorDto) {
    await this.exists(id);
    console.log(data);
    return this.prisma.setor.update({
      data,
      where: {
        id: id,
      },
    });
  }

  async updatePartial(id: number, data: UpdatePatchSetorDto) {
    await this.exists(id);
    console.log(data);
    return this.prisma.setor.update({
      data,
      where: {
        id: id,
      },
    });
  }

  async delete(id: number) {
    await this.exists(id);

    return this.prisma.setor.delete({
      where: {
        id: id,
      },
    });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.setor.count({
        where: {
          id,
        },
      }))
    )
      throw new NotFoundException(`O Setor ${id} não existe`);
  }
}
