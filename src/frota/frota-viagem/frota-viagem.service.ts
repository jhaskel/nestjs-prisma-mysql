import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFrotaViagemDto } from './dto/create-frota-viagem.dto';
import { UpdateFrotaViagemDto } from './dto/update-frota-viagem.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class FrotaViagemService {

  constructor(private prisma:PrismaService){}
 
  async create(data: CreateFrotaViagemDto) {
    return this.prisma.frotaViagem.create({data })    
  }


  async findAll() {
    return this.prisma.frotaViagem.findMany(); 
  }

  async findByVeiculo(id: number) {
    await this.exists(id);
    return this.prisma.frotaViagem.findMany({
      where:{veiculoId:id},
      include:{
        frotaveiculos:{select:{id:true,name:true,km:true,image:true,status:true}},
        users:{select:{id:true,name:true}},
        frotareservas:{select:{id:true,motivo:true,destino:true}}              
      }      
    })
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.frotaViagem.findUnique({
      where:{id}
    })
  }

 async update(id: number, data: UpdateFrotaViagemDto) {
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
