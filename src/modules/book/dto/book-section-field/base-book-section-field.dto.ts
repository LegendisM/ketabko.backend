import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { BookSectionFieldType } from "../../interface/book-field.interface";

export class BaseBookSectionFieldDto {
    @ApiProperty({
        enum: BookSectionFieldType
    })
    @IsEnum(BookSectionFieldType)
    type: BookSectionFieldType;

    @ApiProperty({
        minLength: 1
    })
    @IsString()
    @IsNotEmpty()
    identifier: string;

    @ApiProperty({
        minLength: 1
    })
    @IsString()
    @IsNotEmpty()
    label: string;

    @ApiProperty()
    @IsString()
    placeholder: string;

    @ApiProperty()
    @IsString()
    helper: string;

    @ApiProperty()
    @IsString()
    default: string;

    @ApiProperty({
        minLength: 1
    })
    @IsString()
    @IsNotEmpty()
    group: string;

    @ApiProperty()
    @IsNumber()
    row: number;
}