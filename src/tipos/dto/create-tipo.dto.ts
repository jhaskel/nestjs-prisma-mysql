import { IsNumber, IsString } from "class-validator";

export class CreateTipoDto {
    @IsString()
    name:string;
    @IsString()
    codigo:string;   
    @IsNumber()
    setorId:number;
    @IsString()
    image:string;
    
      
  
}
