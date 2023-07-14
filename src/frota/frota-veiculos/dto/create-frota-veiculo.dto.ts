
import { IsEnum, IsNumber, IsString } from "class-validator";
import { StatusVeiculo } from "src/enums/status-veiculos.enum";


export class CreateFrotaVeiculoDto {
    @IsNumber()
    setorId:number;
    km:number;
    @IsString()
    marca:string;
    modelo:string;
    name:string;
    ano:string;
    placa:string;
    chassi:string;   
    image:string;      
    @IsEnum(StatusVeiculo)
    status:string
}
