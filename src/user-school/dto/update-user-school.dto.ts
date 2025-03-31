import { PartialType } from "@nestjs/mapped-types";
import { CreateUserSchoolDto } from "./create-user-school.dto";

export class UpdateUserSchoolDto extends PartialType(CreateUserSchoolDto) {}