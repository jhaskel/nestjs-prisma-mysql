import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./DTO/create-user-dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDto } from "./DTO/update-put-user-dto";
import { UpdatePatchUserDto } from "./DTO/update-patch-user-dto";
import { NotFoundError } from "rxjs";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService{
    constructor(private prisma:PrismaService){}
    async create(data:CreateUserDto){

        data.password = data.password;
        
        const salt = await bcrypt.genSalt();
       
        data.password=  await bcrypt.hash(data.password,salt);

        

        return  this.prisma.user.create({
            data
        
        })


    }
    async list(){
        return  this.prisma.user.findMany({
            
        });
    }


        async show(id:number){
            await this.exists(id);
            return  this.prisma.user.findUnique({
                where:{
                    id:id
                },
                include:{
                    setores:{
                        select:{
                            name:true,
                            id:true
                        }
                    }
                     }
                
            });   
    }

    async show2(id:number){
        await this.exists(id);
        return  this.prisma.user.findUnique({
            where:{
                id:id
            },
          
            
            
            
            
        });   
}

    
    async update(id:number,data:UpdatePutUserDto){
        await this.exists(id);
        const salt = await bcrypt.genSalt();
       
        data.password=  await bcrypt.hash(data.password,salt);
        return  this.prisma.user.update({
           data,
            where:{
                id:id
            }
            
        });   
}
   
async updatePartial(id:number,data:UpdatePatchUserDto){

    await this.exists(id);
    const salt = await bcrypt.genSalt();
       
        data.password=  await bcrypt.hash(data.password,salt);

   
   
    return  this.prisma.user.update({
       data,
        where:{
            id:id
        }
        
    });   
}

async delete(id:number){
   await this.exists(id);
   
    return  this.prisma.user.delete({
        where:{
            id:id
        }
        
    });   
}

async exists(id:number){

    if(!(await this.prisma.user.count({
        where :{
            id
        }

    })))


    throw new NotFoundException(`O usuário ${id} não existe`);
}
   
}
