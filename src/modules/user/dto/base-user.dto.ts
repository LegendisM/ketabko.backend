import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, Length, IsArray, IsUUID, IsOptional } from "class-validator";
import { Role } from "../interface/role.interface";

export class BaseUserDto {
    @ApiProperty()
    @IsUUID()
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

    @ApiProperty({
        enum: Role,
        isArray: true
    })
    @IsArray()
    roles: Role[];

    @ApiProperty()
    @IsString()
    @IsOptional()
    avatar: string;
}