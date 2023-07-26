import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class BaseBookSectionFieldValueDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    identifier: string;

    @ApiProperty({
        maxLength: 2000
    })
    @IsString()
    @MaxLength(2000)
    value: string;
}