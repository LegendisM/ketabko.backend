import { IsString, IsUUID, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class BaseBookDto {
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
        minLength: 1,
        maxLength: 255
    })
    @IsString()
    @Length(1, 255)
    description: string;

    @ApiProperty({
        description: 'Book Summary Text',
        minLength: 1,
        maxLength: 1024
    })
    @IsString()
    @Length(1, 1024)
    summary: string;

    @ApiProperty({
        description: 'UUID Of the StorageFile for Cover Image'
    })
    @IsUUID()
    cover: string;

    @ApiProperty({
        description: 'UUID Of the StorageFile for Audio File'
    })
    @IsUUID()
    audio: string;
}