import {
  Body,
  Controller,
  Get,
  Patch,
  Put,
  Post,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './DTO/create-user-dto';

import { UpdatePatchUserDto } from './DTO/update-patch-user-dto';
import { UserService } from './user.service';

import { ParamId } from 'src/decorators/param-id-decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { UpdatePutUserDto1 } from './DTO/update-put-user-dto1';
import { UpdatePutUserDtoSetor } from './DTO/update-put-user-dto_setor';

//@UseInterceptors(LogInterceptor)

@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseInterceptors(LogInterceptor)
  @Roles(Role.Admin, Role.Secretario, Role.Master)
  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Roles(Role.Admin, Role.Secretario, Role.Controle, Role.Master)
  @Get()
  async list() {
    return this.userService.list();
  }

  @Roles(Role.Admin, Role.User)
  @Get(':id')
  async show(@ParamId() id: number) {
    console.log('temos');
    return this.userService.show(id);
  }

  @Roles(Role.Admin)
  @Put(':id')
  async update(@Body() data: UpdatePutUserDto1, @ParamId() id: number) {
    return this.userService.update(id, data);
  }

  @Roles(Role.Admin, Role.Secretario, Role.Controle, Role.Master)
  @Put('setor/:id')
  async updateSetor(
    @Body() data: UpdatePutUserDtoSetor,
    @ParamId() id: number,
  ) {
    console.log('chegou  ' + data.setorId);
    return this.userService.updateSetor(id, data);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async updatePartial(@Body() data: UpdatePatchUserDto, @ParamId() id: number) {
    return this.userService.updatePartial(id, data);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@ParamId() id: number) {
    return this.userService.delete(id);
  }
}
