
import { Exclude } from 'class-transformer';
import { Session } from 'src/session/entities/session.entity';
import { UserSchool } from 'src/user-school/entities/user-school.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  googleId: string;

  @Column({ default: false })
  twoFactorEnabled: boolean;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  @Exclude()
  twoFactorSecret: string;

  @OneToMany(() => Session, session => session.user)
  sessions: Session[];

  @OneToMany(() => UserSchool, userSchoolRole => userSchoolRole.user)
  userSchoolRoles: UserSchool[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}