import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, Length, IsArray, IsUUID, IsPhoneNumber, IsNumber, Min, Max } from "class-validator";
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
    @IsPhoneNumber('IR')
    phone: string;

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
        minimum: 0,
        maximum: 10000
    })
    @IsNumber()
    @Min(0)
    @Max(10000)
    level: number;

    @ApiProperty({
        enum: Role,
        isArray: true
    })
    @IsArray()
    roles: Role[];

    @ApiProperty({
        description: 'UUID Of the StorageFile for Avatar Image'
    })
    @IsUUID()
    avatar: string;
}