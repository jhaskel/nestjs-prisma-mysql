import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFrotaViagemDto } from './dto/create-frota-viagem.dto';
import { UpdateFrotaViagemDto } from './dto/update-frota-viagem.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FrotaViagemService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateFrotaViagemDto) {
    const dados = await this.prisma.frotaViagem.create({ data });

    return {
      success: true,
      message: 'Viagem Adicionada com sucesso!',
      data: dados,
    };
  }

  async findAll() {
    return this.prisma.frotaViagem.findMany();
  }

  async findByVeiculo(id: number) {
    await this.exists(id);
    return this.prisma.frotaViagem.findMany({
      where: { veiculoId: id, AND: { isAtivo: true } },
      include: {
        frotaveiculos: {
          select: {
            id: true,
            name: true,
            km: true,
            image: true,
            isViagem: true,
            marca: true,
            placa: true,
          },
        },
        users: { select: { id: true, name: true } },
        frotareservas: { select: { id: true, motivo: true, destino: true } },
      },
    });
  }

  async findByUser(id: number) {
    await this.existUser(id);
    return this.prisma.frotaViagem.findMany({
      where: { userId: id, AND: { isAtivo: true } },
      include: {
        frotaveiculos: {
          select: {
            id: true,
            name: true,
            km: true,
            image: true,
            isViagem: true,
            marca: true,
            placa: true,
          },
        },
        users: { select: { id: true, name: true } },
        frotareservas: { select: { id: true, motivo: true, destino: true } },
      },
    });
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.frotaViagem.findUnique({
      where: { id: id },
      include: {
        frotaveiculos: {
          select: {
            id: true,
            name: true,
            km: true,
            image: true,
            isViagem: true,
            marca: true,
            placa: true,
          },
        },
        users: { select: { id: true, name: true } },
        frotareservas: { select: { id: true, motivo: true, destino: true } },
      },
    });
  }

  async update(id: number, data: UpdateFrotaViagemDto) {
    await this.exists(id);
    const dt = new Date(data.finalAt);
    const stff = false;
    const dados = await this.prisma.frotaViagem.update({
      where: { id },
      data: { finalAt: dt, kmFinal: data.kmFinal, isAtiva: stff },
    });

    return {
      success: true,
      message: 'Viagem Finalizada com sucesso!',
      data: dados,
    };
  }

  async remove(id: number) {
    await this.exists(id);
    return this.prisma.frotaViagem.delete({ where: { id } });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.frotaViagem.count({
        where: { id },
      }))
    )
      throw new NotFoundException(`Essa viagem  não existe `);
  }

  async existUser(id: number) {
    console.log(id);
    if (
      !(await this.prisma.frotaViagem.count({
        where: { userId: id },
      }))
    )
      throw new NotFoundException(`Não tem viagem para esse usuário`);
  }
}
