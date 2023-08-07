import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DocUserService } from 'src/docUser/docUser.service';

@Injectable()
export class DocumentosService {
  constructor(
    private prisma: PrismaService,
    private docUserService: DocUserService,
  ) {}

  async create(data: CreateDocumentoDto) {
    console.log(data);
    const dados = await this.prisma.documento.create({
      data,
    });

    await this.docUserService.create({
      userId: dados.userId,
      docId: dados.id,
    });

    return dados;
  }

  async findAll() {
    return this.prisma.documento.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async findByUser(id: number) {
    return this.prisma.documento.findMany({
      where: {
        docuser: { some: { userId: id } },
      },
      include: {
        docuser: {
          include: {
            users: { select: { name: true, image: true } },
          },
        },
        tipos: { select: { name: true, image: true } },
        setores: { select: { id: true, name: true, image: true, sigla: true } },
        users: { select: { name: true, image: true } },

        mess: { select: { documentoId: true } },
        anexo: { select: { documentoId: true } },
      },
      orderBy: { id: 'desc' },
    });
  }

  async findByUserFav(id: number) {
    return this.prisma.documento.findMany({
      where: {
        docuser: { some: { userId: id } },
        AND: {
          favoritos: { some: { userId: id } },
        },
      },
      include: {
        docuser: {
          include: {
            users: { select: { name: true, image: true } },
          },
        },
        tipos: { select: { name: true, image: true } },
        setores: { select: { id: true, name: true, image: true, sigla: true } },
        users: { select: { name: true, image: true } },

        mess: { select: { documentoId: true } },
        anexo: { select: { documentoId: true } },
      },
      orderBy: { id: 'desc' },
    });
  }

  async findByUserSearch(id: number, txt: string) {
    return this.prisma.documento.findMany({
      where: {
        docuser: { some: { userId: id } },

        AND: [
          {
            OR: [
              { titulo: { contains: txt } },
              { codigo: { contains: txt } },
              { ano: { contains: txt } },
              { status: { contains: txt } },
              { users: { name: { contains: txt } } },
              { tipos: { name: { contains: txt } } },
              { setores: { name: { contains: txt } } },
            ],
          },
        ],
      },
      include: {
        docuser: {
          include: {
            users: { select: { name: true, image: true } },
          },
        },
        tipos: { select: { name: true, image: true } },
        setores: { select: { id: true, name: true, image: true, sigla: true } },
        users: { select: { name: true, image: true } },

        mess: { select: { documentoId: true } },
        anexo: { select: { documentoId: true } },
      },
      orderBy: { id: 'desc' },
    });
  }

  async countByUser(id: number) {
    return this.prisma.documento.count({
      where: {
        userId: id,
      },
    });
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.documento.findUnique({
      where: { id },
      include: {
        docuser: {
          where: {
            docId: id,
          },
          include: {
            users: { select: { name: true, image: true } },
          },
        },
      },
    });
  }

  async findUser(id: number) {
    return this.prisma.documento.findMany({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, data: UpdateDocumentoDto) {
    await this.exists(id);
    return this.prisma.documento.update({
      where: { id: id },
      data: data,
    });
  }

  async remove(id: number) {
    await this.exists(id);
    return this.prisma.documento.delete({ where: { id } });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.documento.count({
        where: { id },
      }))
    )
      throw new NotFoundException(`O Cargo com id ${id} não existe`);
  }
}
