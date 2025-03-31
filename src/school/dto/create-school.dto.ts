import { IsString, IsNotEmpty, Length } from 'class-validator';


export class CreateSchoolDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 100)
    name: string;
}
