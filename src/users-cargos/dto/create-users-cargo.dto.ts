import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUsersCargoDto {

  
  @IsNumber() 
  userId  :number;
  @IsString() 
  name    :string ;
 
  
}
