import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFrotaVeiculoUserDto } from './dto/create-frota-veiculo-user.dto';
import { UpdateFrotaVeiculoUserDto } from './dto/update-frota-veiculo-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FrotaVeiculoUserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateFrotaVeiculoUserDto) {
    data.isAtivo = true;
    const dados = await this.prisma.frotaVeiculoUser.create({
      data,
    });
    return {
      success: true,
      message: 'Veículo adicionado ao usuário',
      data: dados,
    };
  }

  async findAll() {
    return this.prisma.frotaVeiculoUser.findMany();
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.frotaVeiculoUser.findFirst({
      where: { id },
      include: {},
    });
  }

  async findByUser(id: number) {
    const dados = this.prisma.frotaVeiculoUser.findMany({
      where: {
        userId: id,
        AND: [
          {
            isAtivo: true,
          },
          { veiculos: { isAtivo: true } },
        ],
      },
      orderBy: { id: 'desc' },

      include: {
        usuario: { select: { id: true, name: true, image: true } },
        veiculos: {
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
      },
    });

    return dados;
  }

  async findUsersByVeiculo(id: number) {
    console.log('chegouhj ' + id);
    const dados = this.prisma.frotaVeiculoUser.findMany({
      where: {
        veiculoId: id,
        AND: [
          {
            isAtivo: true,
          },
          { veiculos: { isAtivo: true } },
        ],
      },

      orderBy: { id: 'desc' },

      include: {
        usuario: { select: { id: true, name: true, image: true } },
      },
    });

    return dados;
  }

  async update(id: number, data: UpdateFrotaVeiculoUserDto) {
    await this.exists(id);
    console.log(data);
    console.log(id);
    const dados = await this.prisma.frotaVeiculoUser.update({
      data,

      where: {
        id: id,
      },
    });
    console.log(dados);

    return {
      success: true,
      message: 'Veículo adicionado ao usuário',
      data: dados,
    };
  }

  async remove(id: number) {
    await this.exists(id);
    return this.prisma.frotaVeiculoUser.delete({ where: { id: id } });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.frotaVeiculoUser.count({
        where: { id },
      }))
    )
      throw new NotFoundException(`O Cargo com id ${id} não existe`);
  }
}
