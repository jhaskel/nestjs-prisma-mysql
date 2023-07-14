import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnexoDto } from './dto/create-anexo.dto';
import { UpdateAnexoDto } from './dto/update-anexo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnexosService {

  constructor(private prisma:PrismaService){}

 
  async create(data: CreateAnexoDto) {
    return this.prisma.anexo.create({
      data
    })
    
  }


  async findAll() {
    return this.prisma.anexo.findMany(); 
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.anexo.findUnique({
      where:{id}
    })
  }

 async update(id: number, data: UpdateAnexoDto) {
  await this.exists(id);
    return this.prisma.anexo.update({
      where:{id},
      data:data
    })
  }

  
  async remove(id: number) {
    await this.exists(id);
    return this.prisma.anexo.delete({where:{id}})
  }

  
  async exists(id: number) {
    if (!(await this.prisma.anexo.count({
        where: {id }
    })))
        throw new NotFoundException(`O Cargo com id ${id} não existe`);
}


}
