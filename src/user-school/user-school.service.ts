import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { UserSchool } from './entities/user-school.entity';
import { CreateUserSchoolDto } from './dto/create-user-school.dto';
import { UserService } from '../user/user.service';
import { SchoolService } from '../school/school.service';
import { UpdateUserSchoolDto } from './dto/update-user-school.dto';
import { Role } from 'src/common/enums/role.enum';
import { ResponseUserSchoolDto } from './dto/response-user-school.dto';

@Injectable()
export class UserSchoolService {
  constructor(
    @InjectRepository(UserSchool)
    private userSchoolRepository: Repository<UserSchool>,
    private userService: UserService,
    private schoolService: SchoolService,
  ) { }

  async create(createUserSchoolDto: CreateUserSchoolDto): Promise<ResponseUserSchoolDto> {
    const { userId, schoolId, role } = createUserSchoolDto;
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }

    const school = await this.schoolService.findById(schoolId);
    if (!school) {
      throw new NotFoundException(`School with ID "${schoolId}" not found`);
    }

    const existingUserSchool = await this.userSchoolRepository.findOne({
      where: { user: { id: userId }, school: { id: schoolId } }
    });

    if (existingUserSchool) {
      throw new ConflictException(`UserSchool relation already exists for user "${userId}" and school "${schoolId}"`);
    }

    const userSchool = this.userSchoolRepository.create({
      user,
      school,
      role
    });

    try {
      return this.convertToResponseDto(await this.userSchoolRepository.save(userSchool));
    } catch (error) {
      throw new Error(`Failed to create UserSchool: ${error.message}`);
    }
  }

  async findById(id: string): Promise<UserSchool> {
    const userSchool = await this.userSchoolRepository.findOne({ where: { id } });
    if (!userSchool) {
      throw new NotFoundException(`UserSchool with ID "${id}" not found`);
    }
    return userSchool;
  }

  async update(id: string, updateUserSchoolDto: UpdateUserSchoolDto): Promise<ResponseUserSchoolDto> {
    const userSchool = await this.userSchoolRepository.findOne({ where: { id } });

    if (!userSchool) {
      throw new NotFoundException(`UserSchool with ID "${id}" not found`);
    }

    if (updateUserSchoolDto.userId) {
      const newUser = await this.userService.findById(updateUserSchoolDto.userId);
      if (!newUser) {
        throw new NotFoundException(`User with ID "${updateUserSchoolDto.userId}" not found`);
      }
      userSchool.user = newUser;
    }

    if (updateUserSchoolDto.schoolId) {
      const newSchool = await this.schoolService.findById(updateUserSchoolDto.schoolId);
      if (!newSchool) {
        throw new NotFoundException(`School with ID "${updateUserSchoolDto.schoolId}" not found`);
      }
      userSchool.school = newSchool;
    }

    const existingRelation = await this.userSchoolRepository.findOne({
      where: {
        user: { id: userSchool.user.id },
        school: { id: userSchool.school.id },
        id: Not(id),
      },
    });

    if (existingRelation) {
      throw new ConflictException('This User-School relation already exists');
    }

    if (updateUserSchoolDto.role !== undefined) {
      if (!Object.values(Role).includes(updateUserSchoolDto.role)) {
        throw new BadRequestException(`Invalid role: ${updateUserSchoolDto.role}`);
      }
      userSchool.role = updateUserSchoolDto.role;
    }

    const userSchoolUpdated = await this.userSchoolRepository.save(userSchool);
    return this.convertToResponseDto(userSchoolUpdated);
  }

  async remove(id: string): Promise<void> {
    const result = await this.userSchoolRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`UserSchool with ID "${id}" not found`);
    }
  }

  async findByUser(userId: string): Promise<UserSchool[]> {
    return this.userSchoolRepository.find({ where: { user: { id: userId } } });
  }

  async findBySchool(schoolId: string): Promise<UserSchool[]> {
    return this.userSchoolRepository.find({ where: { school: { id: schoolId } } });
  }

  async findByUserAndSchool(userId: string, schoolId: string): Promise<UserSchool> {
    const userSchool = await this.userSchoolRepository.findOne({
      where: { user: { id: userId }, school: { id: schoolId } },
    });
    if (!userSchool) {
      throw new NotFoundException(`UserSchool with userId "${userId}" and schoolId "${schoolId}" not found`);
    }
    return userSchool;
  }

  private convertToResponseDto(userSchool: UserSchool): ResponseUserSchoolDto {
    return {
      id: userSchool.id,
      userId: userSchool.user.id,
      schoolId: userSchool.school.id,
      role: userSchool.role,
    };
  }
}