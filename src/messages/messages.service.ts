import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateMessageDto) {
    return this.prisma.messages.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.messages.findMany();
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.messages.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateMessageDto) {
    await this.exists(id);
    return this.prisma.messages.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number) {
    await this.exists(id);
    return this.prisma.messages.delete({ where: { id } });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.messages.count({
        where: { id },
      }))
    )
      throw new NotFoundException(`O Cargo com id ${id} não existe`);
  }
}
