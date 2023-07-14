import { IsNumber, IsString } from "class-validator";

export class CreateAnexoDto {
    @IsNumber()
    documentoId:number;
    @IsString()
    titulo:string
    @IsString()
    anexo:string
}
