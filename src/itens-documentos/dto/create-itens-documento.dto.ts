import { Prisma } from "@prisma/client";
import { IsDecimal, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateItensDocumentoDto {
    @IsOptional()
    @IsString()
    titulo:string;
    
    @IsOptional()
    @IsString()    
    unidade:string; 
   
    @IsOptional()
    @IsString()
    anexo:string;   
    
    @IsOptional()
    @IsNumber()
    documentoId:number;
    
    @IsOptional()
    @IsNumber()
    quantidade:number

}
