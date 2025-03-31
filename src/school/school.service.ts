import { Injectable, NotFoundException, BadRequestException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from './entities/school.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private schoolRepository: Repository<School>
  ) {}

  async create(createSchoolDto: CreateSchoolDto): Promise<School> {
    const school = this.schoolRepository.create(createSchoolDto);
    
    try {
      return await this.schoolRepository.save(school);
    } catch (error) {
      throw new UnprocessableEntityException(`Failed to create school: ${error.message}`);
    }
  }

  async findById(id: string): Promise<School> {
    this.checkUuidValidity(id);
    
    const school = await this.schoolRepository.findOne({ where: { id } });
    if (!school) {
      throw new NotFoundException(`School with ID ${id} not found`);
    }
    return school;
  }

  async update(id: string, updateSchoolDto: UpdateSchoolDto): Promise<School> {
    this.checkUuidValidity(id);

    const school = await this.schoolRepository.findOne({ where: { id } });
    if (!school) {
      throw new NotFoundException(`School with ID ${id} not found`);
    }

    this.schoolRepository.merge(school, updateSchoolDto);
    return await this.schoolRepository.save(school);
  }

  private checkUuidValidity(id: string): void {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid ID');
    }
  }
}