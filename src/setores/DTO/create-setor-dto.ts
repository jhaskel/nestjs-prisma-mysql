import { IsInt, IsString } from "class-validator";


export class CreateSetorDto {

    @IsString()
    name:string;
   @IsInt()
    idUser:number;

    
}