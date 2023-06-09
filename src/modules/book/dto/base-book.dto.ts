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
        description: 'book summary text',
        minLength: 1,
        maxLength: 255
    })
    @IsString()
    @Length(1, 255)
    summary: string;

    @ApiProperty({
        description: 'book image url'
    })
    @IsString()
    cover: string;

    @ApiProperty({
        description: 'book audio url'
    })
    @IsString()
    audio: string;
}