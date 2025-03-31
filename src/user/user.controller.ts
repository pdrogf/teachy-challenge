import { Controller, Post, Body, Get, Param, Put} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto} from './dto/create-user.dto';
import { UpdateUserDto} from './dto/update-user.dto';
import { instanceToPlain } from 'class-transformer';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    const user = await this.userService.findByEmail(email);
    return instanceToPlain(user);
  }

  @Get('id/:id')
  async findById(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    return instanceToPlain(user);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const user = this.userService.create(createUserDto);
    return instanceToPlain(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userService.update(id, updateUserDto);
    return instanceToPlain(updatedUser);
  }

}
