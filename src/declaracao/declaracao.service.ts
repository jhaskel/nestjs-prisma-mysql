import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeclaracaoDto } from './dto/create-declaracao.dto';
import { UpdateDeclaracaoDto } from './dto/update-declaracao.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DeclaracaoService {
  constructor(private prisma:PrismaService){}


  create(data: CreateDeclaracaoDto) {
    return this.prisma.declaracao.create({
      data
    })
  }

  findAll() {
    return this.prisma.declaracao.findMany();
  }

  findOne(id: number) {
    return this.prisma.declaracao.findUnique({
      where:{id}
    })
  }

  async update(id: number, data: UpdateDeclaracaoDto) {
     
    await this.exists(id);    
   
    return  this.prisma.declaracao.update({
       data,
        where:{
            id:id
        }
        
    });   
  }

  remove(id: number) {
    return `This action removes a #${id} config`;
  }

  async exists(id:number){

    if(!(await this.prisma.declaracao.count({
        where :{
            id
        }

    })))


    throw new NotFoundException(`A declaração ${id} não existe`);
}
}
