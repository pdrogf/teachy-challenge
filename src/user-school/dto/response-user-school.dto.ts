import { Role } from "src/common/enums/role.enum";

export class ResponseUserSchoolDto {
    id: string;
    userId: string;
    schoolId: string;
    role: Role;
  }