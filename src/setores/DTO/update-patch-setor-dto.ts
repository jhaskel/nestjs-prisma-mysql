
import {PartialType} from "@nestjs/mapped-types";
import { CreateSetorDto } from "./create-setor-dto";



export class UpdatePatchSetorDto extends PartialType(CreateSetorDto) {

  


}