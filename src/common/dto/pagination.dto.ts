import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, Max, Min } from "class-validator";

export class PaginationDto {
    @ApiProperty({
        minimum: 1,
        maximum: 100
    })
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(1)
    @Max(100)
    limit: number;

    @ApiProperty({
        minimum: 1
    })
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(1)
    page: number;
}