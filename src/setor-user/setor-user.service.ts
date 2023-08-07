import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateSetorUserDto } from './dto/update-setor-user.dto';

@Injectable()
export class SetorUserService {
  constructor(private prisma: PrismaService) {}

  async create(data) {
    return this.prisma.setoruser.create({
      data,
    });
  }

  findAll() {
    return `This action returns all setorUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} setorUser`;
  }

  update(id: number, data: UpdateSetorUserDto) {
    return `This action updates a #${id} setorUser ` + data;
  }

  remove(id: number) {
    return `This action removes a #${id} setorUser`;
  }
}
