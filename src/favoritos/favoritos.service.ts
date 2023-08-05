import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoritoDto } from './dto/create-favorito.dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { DocUserService } from 'src/docUser/docUser.service';

@Injectable()
export class FavoritosService {
  constructor(
    private prisma: PrismaService,
    private docUserService: DocUserService,
  ) {}

  async create(data: CreateFavoritoDto) {
    console.log(data);
    const dados = await this.prisma.favoritos.create({
      data,
    });
    return dados;
  }

  async remove(id: number) {
    await this.exists(id);
    return this.prisma.favoritos.delete({ where: { id } });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.favoritos.count({
        where: { id },
      }))
    )
      throw new NotFoundException(`O Documento com id ${id} não existe`);
  }
}
