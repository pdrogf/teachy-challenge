import { IsUUID, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class CreateUserSchoolDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  schoolId: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}