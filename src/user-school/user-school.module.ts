import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { School } from '../school/entities/school.entity';
import { UserSchoolService } from './user-school.service';
import { UserSchool} from './entities/user-school.entity';
import { UserSchoolController } from './user-school.controller';
import { SchoolModule } from 'src/school/school.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchool, User, School]), UserModule, SchoolModule],
  controllers: [UserSchoolController],
  providers: [UserSchoolService],
  exports: [UserSchoolService],
})
export class UserSchoolModule {}