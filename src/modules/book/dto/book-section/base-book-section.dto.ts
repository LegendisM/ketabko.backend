import { IsString, IsUUID, Length, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { BookSectionField } from "../../class/book-section-field.class";

export class BaseBookSectionDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty({
        minLength: 1,
        maxLength: 35
    })
    @IsString()
    @Length(1, 35)
    title: string;

    @ApiProperty({
        type: [BookSectionField]
    })
    @ValidateNested({ each: true })
    @Type(() => BookSectionField)
    fields: BookSectionField[];

    @ApiProperty({
        description: 'UUID Of Book'
    })
    @IsUUID()
    book: string;
}