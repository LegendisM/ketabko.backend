import { IsNumber, IsString, IsUUID, Length, Max, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

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
    @Length(1, 500)
    description: string;

    @ApiProperty({
        minimum: 0,
        maximum: 5000000
    })
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(0)
    @Max(5000000)
    price: number;

    @ApiProperty({
        description: 'UUID Of the Author'
    })
    @IsUUID()
    author: string;
    
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