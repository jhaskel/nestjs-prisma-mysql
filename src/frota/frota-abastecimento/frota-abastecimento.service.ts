import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFrotaAbastecimentoDto } from './dto/create-frota-abastecimento.dto';
import { UpdateFrotaAbastecimentoDto } from './dto/update-frota-abastecimento.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FrotaAbastecimentoService {
  constructor(private prisma:PrismaService){}

 
  async create(data: CreateFrotaAbastecimentoDto) {
    return this.prisma.frotaAbastecimento.create({
      data
    })
    
  }


  async findAll() {
    return this.prisma.frotaAbastecimento.findMany(); 
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.frotaAbastecimento.findUnique({
      where:{id}
    })
  }

 async update(id: number, data: UpdateFrotaAbastecimentoDto) {
  await this.exists(id);
    return this.prisma.frotaAbastecimento.update({
      where:{id},
      data:data
    })
  }

  
  async remove(id: number) {
    await this.exists(id);
    return this.prisma.frotaAbastecimento.delete({where:{id}})
  }

  
  async exists(id: number) {
    if (!(await this.prisma.frotaAbastecimento.count({
        where: {id }
    })))
        throw new NotFoundException(`O Cargo com id ${id} não existe`);
}


}
