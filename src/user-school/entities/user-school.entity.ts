import { Exclude } from 'class-transformer';
import { Role } from 'src/common/enums/role.enum';
import { School } from 'src/school/entities/school.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('user_schools')
export class UserSchool {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.userSchoolRoles)
  @Exclude()
  user: User;

  @ManyToOne(() => School, school => school.userSchoolRoles)
  @Exclude()
  school: School;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.STUDENT
  })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}