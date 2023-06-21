import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDc1Dto } from './dto/create-dc1.dto';
import { UpdateDc1Dto } from './dto/update-dc1.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class Dc1Service {
  constructor(
    private prisma:PrismaService,
   
    
    
    ){}

 
  async create(data: CreateDc1Dto) {
    return this.prisma.dc1.create({
      data
    })
    
  }


  async findAll() {
    return this.prisma.dc1.findMany(); 
  }

  async findOne(id: number) {
    await this.exists(id);


    
    return  this.prisma.dc1.findUnique({
      where:{id},
      include:{
        documentos:{
          include:{
            tipos:{
              include:{
                setores:{}
              }
            }
          }
        }
      }
    })


    
  }

 async update(id: number, data: UpdateDc1Dto) {
  await this.exists(id);
    return this.prisma.dc1.update({
      where:{id},
      data:data
    })
  }

  
  async remove(id: number) {
    await this.exists(id);
    return this.prisma.dc1.delete({where:{id}})
  }

  
  async exists(id: number) {
    if (!(await this.prisma.dc1.count({
        where: {id }
    })))
        throw new NotFoundException(`O Cargo com id ${id} não existe`);
}


}
