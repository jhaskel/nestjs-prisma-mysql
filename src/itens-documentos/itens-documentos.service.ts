import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItensDocumentoDto } from './dto/create-itens-documento.dto';
import { UpdateItensDocumentoDto } from './dto/update-itens-documento.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItensDocumentosService {
  constructor(private prisma:PrismaService){}

 
  async create(data: CreateItensDocumentoDto) {
    return this.prisma.itensDocumento.create({
      data
    })
    
  }


  async findAll() {
    return this.prisma.itensDocumento.findMany(); 
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.itensDocumento.findUnique({
      where:{id}
    })
  }

 async update(id: number, data: UpdateItensDocumentoDto) {
  await this.exists(id);
    return this.prisma.itensDocumento.update({
      where:{id},
      data:data
    })
  }

  
  async remove(id: number) {
    await this.exists(id);
    return this.prisma.itensDocumento.delete({where:{id}})
  }

  
  async exists(id: number) {
    if (!(await this.prisma.itensDocumento.count({
        where: {id }
    })))
        throw new NotFoundException(`O item de id ${id} não existe`);
}


}
