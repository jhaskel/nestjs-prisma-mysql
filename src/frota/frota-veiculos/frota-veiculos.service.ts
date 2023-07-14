import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFrotaVeiculoDto } from './dto/create-frota-veiculo.dto';
import { UpdateFrotaVeiculoDto } from './dto/update-frota-veiculo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FrotaVeiculosService {
  constructor(private prisma:PrismaService){}

 
  async create(data: CreateFrotaVeiculoDto) {
    return this.prisma.frotaVeiculos.create({
      data
    })
    
  }

  async findAll() {
    return this.prisma.frotaVeiculos.findMany(); 
  }
  

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.frotaVeiculos.findFirst({
      where:{id}
    })
  }

  async update(id: number, data: UpdateFrotaVeiculoDto) {
    await this.exists(id);
    console.log(data);
    return this.prisma.frotaVeiculos.update({
        data,
        where: {
            id: id
        }
    });
}

//recebe dados do frotaViagemController=>create
async updateStatus(data) {  

  return this.prisma.frotaVeiculos.update({
      data,
      where: {
          id: data.id
      }
  });
}

  
  async remove(id: number) {
    await this.exists(id);
    return this.prisma.frotaVeiculos.delete({ where: {id:id }})
  }

  
  async exists(id: number) {
    if (!(await this.prisma.frotaVeiculos.count({
        where: {id }
    })))
        throw new NotFoundException(`O Cargo com id ${id} não existe`);
}


}
