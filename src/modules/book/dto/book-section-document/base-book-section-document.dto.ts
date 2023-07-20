import { IsUUID, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BookSectionFieldValue } from "../../class/book-section-field-value.class";
import { Type } from "class-transformer";

export class BaseBookSectionDocumentDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty({
        type: [BookSectionFieldValue]
    })
    @ValidateNested({ each: true })
    @Type(() => BookSectionFieldValue)
    values: BookSectionFieldValue[];

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