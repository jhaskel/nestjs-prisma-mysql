import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoDto } from './dto/create-tipo.dto';
import { UpdateTipoDto } from './dto/update-tipo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TiposService {
  [x: string]: any;
  constructor(private prisma:PrismaService){}

 
  async create(data: CreateTipoDto) {
    return this.prisma.tipo.create({
      data
    })
    
  }


  async findAll() {
    return this.prisma.tipo.findMany(); 
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.tipo.findUnique({
      where:{id}
    })
  }

  async findBySetor(id: number) {
    await this.exists(id);
    return this.prisma.tipo.findMany({
      where:{setorId:id}
    })
  }

 async update(id: number, data: UpdateTipoDto) {
  await this.exists(id);
    return this.prisma.tipo.update({
      where:{id},
      data:data
    })
  }

  
  async remove(id: number) {
    await this.exists(id);
    return this.prisma.tipo.delete({where:{id}})
  }

  
  async exists(id: number) {
    if (!(await this.prisma.tipo.count({
        where: {id }
    })))
        throw new NotFoundException(`O Cargo com id ${id} não existe`);
}


}
