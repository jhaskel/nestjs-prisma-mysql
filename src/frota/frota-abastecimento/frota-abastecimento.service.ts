import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFrotaAbastecimentoDto } from './dto/create-frota-abastecimento.dto';
import { UpdateFrotaAbastecimentoDto } from './dto/update-frota-abastecimento.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FrotaAbastecimentoService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateFrotaAbastecimentoDto) {
    if (data.mes == null) {
      const mees = new Date().getMonth();
      data.mes = mees + 1;
    }
    let media = 0;
    const d = await this.prisma.frotaAbastecimento.count({
      where: { veiculoId: data.veiculoId },
    });

    if (d > 0) {
      const da = await this.prisma.frotaAbastecimento.findFirst({
        where: { veiculoId: data.veiculoId },
        select: { kmAt: true },
        orderBy: { id: 'desc' },
      });

      if (da.kmAt > 0) {
        media = (data.kmAt - da.kmAt) / data.litros;
      }
    }

    data.media = media;

    const dados = await this.prisma.frotaAbastecimento.create({
      data,
    });

    return {
      success: true,
      message: 'Abestecimento adicionado  com sucesso',
      data: dados,
    };
  }

  async findAll() {
    return this.prisma.frotaAbastecimento.findMany();
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.frotaAbastecimento.findUnique({
      where: { id },
    });
  }

  async findByVeiculo(id: number, ano: number, mes: number) {
    console.log(ano);
    await this.existVeiculo(id);

    return this.prisma.frotaAbastecimento.findMany({
      where: {
        veiculoId: id,
        AND: {
          createdAt: {
            gte: new Date(ano, mes - 1, 1, 0, 0),
            lte: new Date(ano, mes - 1, 31, 23, 59),
          },
        },
      },
      include: {
        frotaveiculos: {
          select: {
            id: true,
            name: true,
            km: true,
            image: true,
            isViagem: true,
            isAtivo: true,
            placa: true,
          },
        },
        users: { select: { id: true, name: true } },
      },
      orderBy: { id: 'desc' },
    });
  }

  async findByVeiculoByMes(id: number, ano: number) {
    await this.existVeiculo(id);
    const dados = await this.prisma.frotaAbastecimento.groupBy({
      by: ['mes'],
      where: {
        veiculoId: id,
        AND: {
          createdAt: {
            gte: new Date(ano, 0 - 1, 1, 0, 0),
            lte: new Date(ano, 11 - 1, 31, 23, 59),
          },
        },
      },
      _count: { id: true },
      _sum: { litros: true },
      orderBy: { mes: 'asc' },
    });

    const newArray = dados.map((element) => {
      return {
        nome: element.mes.toString(),
        valor: element._sum.litros,
        quant: element._count.id,
      };
    });

    return newArray;
  }

  async update(id: number, data: UpdateFrotaAbastecimentoDto) {
    await this.exists(id);
    return this.prisma.frotaAbastecimento.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number) {
    await this.exists(id);
    return this.prisma.frotaAbastecimento.delete({ where: { id } });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.frotaAbastecimento.count({
        where: { id },
      }))
    )
      throw new NotFoundException(`O Cargo com id ${id} não existe`);
  }

  async existVeiculo(id: number) {
    console.log(id);
    if (
      !(await this.prisma.frotaVeiculos.count({
        where: { id: id },
      }))
    )
      throw new NotFoundException(`Esse Veículo não Existe`);
  }
}
