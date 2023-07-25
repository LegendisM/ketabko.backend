import { IsDate, IsNotEmpty, IsString, IsUUID, Length, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BookSectionFieldValue } from "../../class/book-section-field-value.class";
import { Type } from "class-transformer";

export class BaseBookSectionDocumentDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty({
        minLength: 1,
        maxLength: 50
    })
    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    title: string;

    @ApiProperty({
        type: [BookSectionFieldValue]
    })
    @ValidateNested({ each: true })
    @Type(() => BookSectionFieldValue)
    values: BookSectionFieldValue[];

    @ApiProperty()
    @IsDate()
    createdAt: Date;

    @ApiProperty({
        description: 'UUID Of Section'
    })
    @IsUUID()
    section: string;

    @ApiProperty({
        description: 'UUID Of User'
    })
    @IsUUID()
    user: string;
}