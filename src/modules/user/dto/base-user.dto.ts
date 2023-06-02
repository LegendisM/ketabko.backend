import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, Length } from "class-validator";

export class BaseUserDto {
    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty({
        minLength: 3,
        maxLength: 16
    })
    @IsString()
    @Length(3, 16)
    username: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty({
        minLength: 4,
        maxLength: 18
    })
    @IsString()
    @Length(4, 18)
    password: string;
}