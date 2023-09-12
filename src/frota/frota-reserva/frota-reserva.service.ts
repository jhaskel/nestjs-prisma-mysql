import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFrotaReservaDto } from './dto/create-frota-reserva.dto';
import { UpdateFrotaReservaDto } from './dto/update-frota-reserva.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { StatusReserva } from 'src/enums/status-veiculos.enum';

@Injectable()
export class FrotaReservaService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateFrotaReservaDto) {
    const dados = await this.prisma.frotaReserva.create({
      data,
    });

    return {
      success: true,
      message: 'Reserva adicionada  com sucesso',
      data: dados,
    };
  }

  async findAll() {
    return this.prisma.frotaReserva.findMany();
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.frotaReserva.findUnique({
      where: { id },
    });
  }

  async findByUser(id: number) {
    const data = new Date();

    data.setHours(data.getHours() - 3);

    await this.existUser(id);
    return this.prisma.frotaReserva.findMany({
      where: {
        userId: id,
        AND: [{ isAtivo: true }, { reservedTo: { gte: data } }],
      },
      orderBy: { id: 'desc' },
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
            responsavelId: true,
            responsavel: { select: { id: true, name: true } },
          },
        },
        users: { select: { id: true, name: true } },
        autorization: { select: { id: true, name: true } },
      },
    });
  }

  async findByVeiculo(id: number) {
    await this.existVeiculo(id);

    const data = new Date();
    console.log(data.getHours()); // 9
    data.setHours(data.getHours() - 3);
    console.log(data.getHours()); // 12

    const agora = new Date();

    return this.prisma.frotaReserva.findMany({
      where: {
        veiculoId: id,
        AND: [{ isAtivo: true }, { reservedTo: { gte: data } }],
        NOT: {
          status: StatusReserva.reprovado,
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
            placa: true,
            isAtivo: true,
            responsavelId: true,
            responsavel: { select: { id: true, name: true } },
          },
        },
        users: { select: { id: true, name: true } },
        autorization: { select: { id: true, name: true } },
      },
    });
  }

  async update(id: number, data: UpdateFrotaReservaDto) {
    await this.exists(id);

    const dados = await this.prisma.frotaReserva.update({
      where: { id },
      data: data,
    });

    return {
      success: true,
      message: 'Reserva adicionada  com sucesso',
      data: dados,
    };
  }

  //recebe dados do frotaViagemController=>update
  async updateIsAtivo(data) {
    return this.prisma.frotaReserva.update({
      where: { id: data.id },
      data: data,
    });
  }

  async updateAtivo(data) {
    const dados = await this.prisma.frotaReserva.update({
      where: { id: data.id },
      data: data,
    });

    return {
      success: true,
      message: 'Reserva alterada  com sucesso',
      data: dados,
    };
  }

  async updateStatus(data) {
    const dados = await this.prisma.frotaReserva.update({
      where: { id: data.id },
      data: data,
    });

    return {
      success: true,
      message: 'Status alterado  com sucesso',
      data: dados,
    };
  }

  async remove(id: number) {
    await this.exists(id);
    return this.prisma.frotaReserva.delete({ where: { id } });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.frotaReserva.count({
        where: { id },
      }))
    )
      throw new NotFoundException(`A reserva com id ${id} não existe`);
  }

  async existUser(id: number) {
    console.log(id);
    if (
      !(await this.prisma.frotaReserva.count({
        where: { userId: id },
      }))
    )
      throw new NotFoundException(`Não tem Reservas para esse usuário`);
  }

  async existVeiculo(id: number) {
    console.log(id);
    if (
      !(await this.prisma.frotaReserva.count({
        where: { veiculoId: id },
      }))
    )
      throw new NotFoundException(`Não tem Reservas para esse veículo`);
  }
}
