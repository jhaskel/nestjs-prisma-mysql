import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsersCargoDto } from './dto/create-users-cargo.dto';
import { UpdateUsersCargoDto } from './dto/update-users-cargo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersCargosService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUsersCargoDto) {
    return this.prisma.userCargo.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.userCargo.findMany();
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.userCargo.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateUsersCargoDto) {
    await this.exists(id);
    return this.prisma.userCargo.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number) {
    await this.exists(id);
    return this.prisma.userCargo.delete({ where: { id } });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.userCargo.count({
        where: { id },
      }))
    )
      throw new NotFoundException(`O Cargo com id ${id} não existe`);
  }
}
