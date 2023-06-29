import { Injectable } from '@nestjs/common';
import { CreateDeclaracaoDto } from './dto/create-declaracao.dto';
import { UpdateDeclaracaoDto } from './dto/update-declaracao.dto';

@Injectable()
export class DeclaracaoService {
  create(createDeclaracaoDto: CreateDeclaracaoDto) {
    return 'This action adds a new declaracao';
  }

  findAll() {
    return `This action returns all declaracao`;
  }

  findOne(id: number) {
    return `This action returns a #${id} declaracao`;
  }

  update(id: number, updateDeclaracaoDto: UpdateDeclaracaoDto) {
    return `This action updates a #${id} declaracao`;
  }

  remove(id: number) {
    return `This action removes a #${id} declaracao`;
  }
}
