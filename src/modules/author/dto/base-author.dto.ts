import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID, Length } from "class-validator";

export class BaseAuthorDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty({
        description: 'author name',
        minLength: 1,
        maxLength: 30
    })
    @IsString()
    @Length(1, 30)
    name: string;

    @ApiProperty({
        description: 'author about text',
        minLength: 1,
        maxLength: 255
    })
    @IsString()
    @Length(1, 255)
    description: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    avatar?: string;
}