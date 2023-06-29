import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';
import { PrismaService } from 'src/prisma/prisma.service';

import { CreateDocUserDto } from 'src/docUser/dto/create-docUser.dto';
import { DocUserService } from 'src/docUser/docUser.service';

@Injectable()
export class DocumentosService {
  constructor(
    private prisma:PrismaService,
    private docUserService:DocUserService,
    
    
    ){}

 
  async create(data: CreateDocumentoDto) {
    
    console.log(data);
    const dados =await  this.prisma.documento.create({
      data
    })
       
 
     
     await this.docUserService.create({
      userId:dados.userId,
      docId:dados.id
    })

    return dados;
    
  }


  async findAll() {
    return this.prisma.documento.findMany({
      
      orderBy:{id:"desc" },
      
      

    }); 
  }
  
  async findByUser(id:number) {
    return this.prisma.documento.findMany({
      where:{userId:id},
      include:{
        docuser:{include:{
          users:{select:{name:true,image:true}}
        }},
        tipos:{select:{name:true,image:true}},
        users:{select:{name:true,image:true}},
        setores:{select:{name:true,image:true}}
      },
      orderBy:{id:"desc" },
      
      

    }); 
  }

  async findOne(id: number) {
    await this.exists(id);
    return this.prisma.documento.findUnique({
      where:{id},
      include:{
        docuser:{where:{
          docId:id

        },include:{
          users:{select:{name:true,image:true}}
        }
      }
      }
    })
  }


  async findUser(id: number) {
    return this.prisma.documento.findMany({
      where:{
        id:12
      }
    }); 
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
