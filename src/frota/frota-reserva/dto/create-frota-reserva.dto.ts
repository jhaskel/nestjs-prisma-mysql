import { IsDateString, IsNumber, IsString } from "class-validator";
import { isDate } from "util/types";

export class CreateFrotaReservaDto {
    @IsNumber()
    userId:number;
    autorizationId:number;
    veiculoId:number;
    @IsString()
    destino:string;
    motivo:string;
    status:string;
    @IsDateString()
    reservedTo:string




}
