import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFrotaVeiculoUserDto } from './dto/create-frota-veiculo-user.dto';
import { UpdateFrotaVeiculoUserDto } from './dto/update-frota-veiculo-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FrotaVeiculoUserService {
  constructor(private prisma:PrismaService){}

 
  async create(data: CreateFrotaVeiculoUserDto) {
    return this.prisma.frotaVeiculoUser.create({
      data
    })    
  }

  async findAll() {
    return this.prisma.frotaVeiculoUser.findMany(); 
  }
  
  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.frotaVeiculoUser.findFirst({
      where:{id}
    })
  }

  async findByUser(id: number) {
    await this.exists(id);
    return this.prisma.frotaVeiculoUser.findMany({
      where:{userId:id},
      include:{
        autorizado:{select:{id:true,name:true}},
        usuario:{select:{id:true,name:true,image:true}},
        veiculos:{select:{id:true,name:true,placa:true,image:true,status:true,km:true}
      }
      
        
      }
    })
  }

  async update(id: number, data: UpdateFrotaVeiculoUserDto) {
    await this.exists(id);
    console.log(data);
    return this.prisma.frotaVeiculoUser.update({
        data,
        
        where: {
            id: id
            
        }

    });
}

//recebe dados do frotaViagemController=>create
async updateIsOcupando(data) {  
  return this.prisma.frotaVeiculoUser.update({
      data,      
      where: 
      
      {  id: data.id},    

      
  });
}

  
  async remove(id: number) {
    await this.exists(id);
    return this.prisma.frotaVeiculoUser.delete({ where: {id:id }})
  }
  
  async exists(id: number) {
    if (!(await this.prisma.frotaVeiculoUser.count({
        where: {id }
    })))
        throw new NotFoundException(`O Cargo com id ${id} não existe`);
}


}
