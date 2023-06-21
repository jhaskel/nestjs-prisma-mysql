import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConfigDto } from './dto/create-config.dto';
import { UpdateConfigDto } from './dto/update-config.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ConfigsService {
  constructor(private prisma:PrismaService){}


  create(data: CreateConfigDto) {
    return this.prisma.config.create({
      data
    })
  }

  findAll() {
    return this.prisma.config.findMany();
  }

  findOne(id: number) {
    return this.prisma.config.findUnique({
      where:{id}
    })
  }

  async update(id: number, data: UpdateConfigDto) {
     
    await this.exists(id);    
   
    return  this.prisma.config.update({
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

    if(!(await this.prisma.config.count({
        where :{
            id
        }

    })))


    throw new NotFoundException(`A entidade ${id} não existe`);
}
}
