import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DocumentosService {
  constructor(private prisma:PrismaService){}

 
  async create(data: CreateDocumentoDto) {
    return this.prisma.documento.create({
      data
    })
    
  }


  async findAll() {
    return this.prisma.documento.findMany(); 
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.documento.findUnique({
      where:{id}
    })
  }

 async update(id: number, data: UpdateDocumentoDto) {
  await this.exists(id);
    return this.prisma.documento.update({
      where:{id},
      data:data
    })
  }

  
  async remove(id: number) {
    await this.exists(id);
    return this.prisma.documento.delete({where:{id}})
  }

  
  async exists(id: number) {
    if (!(await this.prisma.documento.count({
        where: {id }
    })))
        throw new NotFoundException(`O Cargo com id ${id} não existe`);
}


}
