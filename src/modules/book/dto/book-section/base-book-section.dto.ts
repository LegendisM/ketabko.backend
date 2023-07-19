import { IsString, IsUUID, Length, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { BookField } from "../../class/book-field.class";

export class BaseBookSectionkDto {
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
        type: [BookField]
    })
    @Type(() => BookField)
    fields: BookField[];
}