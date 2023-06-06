import { IsNumber, IsOptional, IsString, Length, Max, Min } from "class-validator";
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class BaseBookDto {
    @ApiProperty()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    id: number;

    @ApiProperty({
        minLength: 1,
        maxLength: 26
    })
    @IsString()
    @Length(1, 26)
    title: string;

    @ApiProperty({
        minLength: 1,
        maxLength: 255
    })
    @IsString()
    @Length(1, 255)
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
        description: 'book image url'
    })
    @IsOptional()
    @IsString()
    cover?: string;

    @ApiProperty({
        description: 'book audio summary url'
    })
    @IsOptional()
    @IsString()
    summary: string;
}