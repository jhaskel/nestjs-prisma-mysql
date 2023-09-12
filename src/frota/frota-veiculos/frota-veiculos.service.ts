import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFrotaVeiculoDto } from './dto/create-frota-veiculo.dto';
import { UpdateFrotaVeiculoDto } from './dto/update-frota-veiculo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FrotaVeiculosService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateFrotaVeiculoDto) {
    const dados = await this.prisma.frotaVeiculos.create({
      data,
    });

    return {
      success: true,
      message: 'Veículo adicionado  com sucesso',
      data: dados,
    };
  }

  async findAll() {
    return this.prisma.frotaVeiculos.findMany({
      include: {
        setores: { select: { id: true, name: true } },
        responsavel: { select: { id: true, name: true } },
      },
    });
  }

  async findBySetor(id: number) {
    const dados = this.prisma.frotaVeiculos.findMany({
      where: {
        setorId: id,
      },

      orderBy: { id: 'desc' },
    });

    return dados;
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.frotaVeiculos.findFirst({
      where: { id },
    });
  }

  async update(id: number, data: UpdateFrotaVeiculoDto) {
    await this.exists(id);
    console.log(data);
    return this.prisma.frotaVeiculos.update({
      data,
      where: {
        id: id,
      },
    });
  }

  async updateAtivo(id: number, data) {
    await this.exists(id);
    console.log(data);
    console.log(id);
    return this.prisma.frotaVeiculos.update({
      data,
      where: {
        id: id,
      },
    });
  }

  //recebe dados do frotaViagemController=>create
  async updateStatus(data) {
    return this.prisma.frotaVeiculos.update({
      data,
      where: {
        id: data.id,
      },
    });
  }

  async remove(id: number) {
    await this.exists(id);
    return this.prisma.frotaVeiculos.delete({ where: { id: id } });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.frotaVeiculos.count({
        where: { id },
      }))
    )
      throw new NotFoundException(`O Cargo com id ${id} não existe`);
  }
}
