import { IsOptional, IsString } from "class-validator";
import { CreateUserDto } from "./create-user-dto";


export class UpdatePutUserDto extends CreateUserDto{

    @IsString()
    @IsOptional()
    updatedAt:string; 



}