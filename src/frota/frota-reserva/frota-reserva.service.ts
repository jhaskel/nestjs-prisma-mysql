import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFrotaReservaDto } from './dto/create-frota-reserva.dto';
import { UpdateFrotaReservaDto } from './dto/update-frota-reserva.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FrotaReservaService {
  constructor(private prisma:PrismaService){}

 
  async create(data: CreateFrotaReservaDto) {
    return this.prisma.frotaReserva.create({
      data
    })
    
  }


  async findAll() {
    return this.prisma.frotaReserva.findMany(); 
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.frotaReserva.findUnique({
      where:{id}
    })
  }

 async update(id: number, data: UpdateFrotaReservaDto) {
  await this.exists(id);
    return this.prisma.frotaReserva.update({
      where:{id},
      data:data
    })
  }

  
  async remove(id: number) {
    await this.exists(id);
    return this.prisma.frotaReserva.delete({where:{id}})
  }

  
  async exists(id: number) {
    if (!(await this.prisma.frotaReserva.count({
        where: {id }
    })))
        throw new NotFoundException(`O Cargo com id ${id} não existe`);
}


}
