import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocUserDto } from './dto/create-docUser.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DocUserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateDocUserDto) {
    return this.prisma.docuser.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.docuser.findMany();
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.docuser.findFirst({
      where: { id },
    });
  }

  async remove(id: number) {
    await this.exists(id);
    return this.prisma.docuser.delete({ where: { id: id } });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.docuser.count({
        where: { id },
      }))
    )
      throw new NotFoundException(`O Cargo com id ${id} não existe`);
  }
}
