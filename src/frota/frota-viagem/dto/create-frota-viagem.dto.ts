import { IsNumber, IsString } from "class-validator";

export class CreateFrotaViagemDto {
    @IsNumber()
    userId:number;
    reservaId:number;
    veiculoId:number;
    kmInicial:number;    
    @IsString()
    destino:string;
    motivo:string;
    
    
    
   

}
