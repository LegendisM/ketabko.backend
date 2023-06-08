import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsString, IsUUID, Length, Max, Min } from "class-validator";

export class BaseProductDto {
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
        minimum: 0,
        maximum: 5000000
    })
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(0)
    @Max(5000000)
    price: number;
}