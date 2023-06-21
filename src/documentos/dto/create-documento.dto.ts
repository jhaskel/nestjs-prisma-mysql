import { IsBoolean, IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDocumentoDto {
    
    @IsNumber()
    tipoId:number;
    @IsNumber()
    userId:number;    
    @IsString()
    titulo:string;
    @IsNumber()  
    codigo:number;
    @IsNumber()
    ano:number;
    @IsBoolean()
    isInterno:boolean     
    @IsOptional()
    @IsNumber()
    id:number;
    
   
}
