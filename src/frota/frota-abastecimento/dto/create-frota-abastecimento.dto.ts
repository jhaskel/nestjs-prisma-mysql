import { IsDecimal, IsNumber } from "class-validator";

export class CreateFrotaAbastecimentoDto {
    @IsNumber()
    userId:number;    
    veiculoId:number;
    kmAt:number;
    @IsDecimal()
    litros:number   

}
