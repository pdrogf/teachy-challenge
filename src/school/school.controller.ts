import { Controller, Post, Body, Put, Param, Get, UseGuards } from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('schools')
@UseGuards(JwtAuthGuard, RolesGuard) 
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Get('id/:id')
  @Roles(Role.PLATFORM_ADMIN)
  async findById(@Param('id') id: string) {
    return this.schoolService.findById(id);
  }

  @Post()
  @Roles(Role.PLATFORM_ADMIN)
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.create(createSchoolDto);
  }

  @Put(':id')
  @Roles(Role.PLATFORM_ADMIN)
  async update(@Param('id') id: string, @Body() updateSchoolDto: UpdateSchoolDto) {
    return this.schoolService.update(id, updateSchoolDto);
  }
}
