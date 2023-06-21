import { Body, Controller, Get, Param, Patch, Put,Post, Delete, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./DTO/create-user-dto";
import { UpdatePutUserDto } from "./DTO/update-put-user-dto";
import { UpdatePatchUserDto } from "./DTO/update-patch-user-dto";
import { UserService } from "./user.service";

import { ParamId } from "src/decorators/param-id-decorator";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";
import { RoleGuard } from "src/guards/role.guard";
import { AuthGuard } from "src/guards/auth.guard";



//@UseInterceptors(LogInterceptor)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {

    constructor(private readonly userService:UserService){}


   // @UseInterceptors(LogInterceptor)
   @Roles(Role.Admin)
   @Post()
    async create(@Body() data:CreateUserDto){
        return this.userService.create( data);

    }

    @Roles(Role.Admin,Role.User)
    @Get()
    async list(){
        return this.userService.list()

    }
   @Roles(Role.Admin,Role.User)
    @Get(':id')
    async show(@ParamId() id:number){
        console.log("temos")
        return this.userService.show(id);
    }


    @Roles(Role.Admin)
    @Put(':id')
    async update(@Body() data:UpdatePutUserDto,@ParamId() id:number){
        return this.userService.update(id,data);

    }
    

    @Roles(Role.Admin)
    @Patch(':id')
    async updatePartial(@Body() data:UpdatePatchUserDto,@ParamId() id:number){
        return  this.userService.updatePartial(id,data);

    }

    @Roles(Role.Admin)
    @Delete(':id')
    async delete(@ParamId() id:number){
        return this.userService.delete(id);
    }
  


}