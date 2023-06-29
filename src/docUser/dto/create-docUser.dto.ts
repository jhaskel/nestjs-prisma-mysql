import { IsNumber, IsOptional } from "class-validator";

export class CreateDocUserDto {
   
   @IsOptional()
    @IsNumber()
    docId:number;
    @IsOptional()
    @IsNumber()
    userId:number;
   

  
  
}
