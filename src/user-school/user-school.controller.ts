import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UserSchoolService } from './user-school.service';
import { CreateUserSchoolDto } from './dto/create-user-school.dto';
import { UpdateUserSchoolDto } from './dto/update-user-school.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('user-schools')
@UseGuards(JwtAuthGuard, RolesGuard) 
export class UserSchoolController {
  constructor(private readonly userSchoolService: UserSchoolService) {}

  @Get('id/:id')
  @Roles(Role.PLATFORM_ADMIN, Role.SCHOOL_ADMIN, Role.COORDINATOR, Role.TEACHER, Role.STUDENT)
  async findById(@Param('id') id: string) {
    return this.userSchoolService.findById(id);
  }

  @Get('user/:userId')
  @Roles(Role.PLATFORM_ADMIN, Role.SCHOOL_ADMIN, Role.COORDINATOR, Role.TEACHER, Role.STUDENT)
  async findByUser(@Param('userId') userId: string) {
    return this.userSchoolService.findByUser(userId);
  }

  @Get('school/:schoolId')
  @Roles(Role.PLATFORM_ADMIN, Role.SCHOOL_ADMIN, Role.COORDINATOR, Role.TEACHER, Role.STUDENT)
  async findBySchool(@Param('schoolId') schoolId: string) {
    return this.userSchoolService.findBySchool(schoolId);
  }

  @Get('user/:userId/school/:schoolId')
  @Roles(Role.PLATFORM_ADMIN, Role.SCHOOL_ADMIN, Role.COORDINATOR, Role.TEACHER, Role.STUDENT)
  async findByUserAndSchool(@Param('userId') userId: string, @Param('schoolId') schoolId: string) {
    return this.userSchoolService.findByUserAndSchool(userId, schoolId);
  }

  @Post()
  @Roles(Role.PLATFORM_ADMIN, Role.SCHOOL_ADMIN, Role.COORDINATOR, Role.TEACHER, Role.STUDENT)
  async create(@Body() createUserSchoolDto: CreateUserSchoolDto) {
    return this.userSchoolService.create(createUserSchoolDto);
  }

  @Put(':id')
  @Roles(Role.PLATFORM_ADMIN, Role.SCHOOL_ADMIN, Role.COORDINATOR, Role.TEACHER, Role.STUDENT)
  async update(@Param('id') id: string, @Body() updateUserSchoolDto: UpdateUserSchoolDto) {
    return this.userSchoolService.update(id, updateUserSchoolDto);
  }

  @Delete(':id')
  @Roles(Role.PLATFORM_ADMIN, Role.SCHOOL_ADMIN, Role.COORDINATOR, Role.TEACHER, Role.STUDENT)
  async remove(@Param('id') id: string) {
    await this.userSchoolService.remove(id);
    return { message: 'UserSchool relationship deleted successfully' };
  }
}