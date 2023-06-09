import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsJSON, IsObject, IsString, IsUUID, Length } from "class-validator";

export class BaseDocumentDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty({
        minLength: 1,
        maxLength: 25
    })
    @IsString()
    @Length(1, 25)
    title: string;

    @ApiProperty({
        minLength: 1,
        maxLength: 50
    })
    @IsString()
    @Length(1, 50)
    description: string;

    @ApiProperty()
    @IsJSON()
    @Transform(({ value }) => JSON.parse(value))
    @IsObject()
    value: Object;
}