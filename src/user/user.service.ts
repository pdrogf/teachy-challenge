import { Injectable, ConflictException, NotFoundException, BadRequestException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async findById(id: string): Promise<User> {
    this.checkUuidValidity(id);
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.checkEmailUniqueness(createUserDto.email);

    const user = this.usersRepository.create(createUserDto);

    if (createUserDto.password) {
      user.password = await this.hashPassword(createUserDto.password);
    }

    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new UnprocessableEntityException(`Failed to create user: ${error.message}`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    this.checkUuidValidity(id);

    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      await this.checkEmailUniqueness(updateUserDto.email);
    }

    if (updateUserDto.password) {
      updateUserDto.password = await this.hashPassword(updateUserDto.password);
    }

    this.usersRepository.merge(user, updateUserDto);

    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new UnprocessableEntityException(`Failed to update user: ${error.message}`);
    }
  }

  private checkUuidValidity(id: string): void{
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid ID');
    }
  }

  private async checkEmailUniqueness(email: string): Promise<void> {
    const emailExists = await this.usersRepository.findOne({ where: { email } });
    if (emailExists) {
      throw new ConflictException('Email already in use');
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }


}