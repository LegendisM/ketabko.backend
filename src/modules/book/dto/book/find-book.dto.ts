import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";

export class FindBooksDto extends IntersectionType(PaginationDto) {
    @ApiProperty({
        required: false,
        description: 'Filter By Title'
    })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({
        required: false,
        description: 'Filter By Description'
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        required: false,
        description: 'Filter by Minimum Price (Be sure to complete the maximum field)'
    })
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsOptional()
    minPrice?: number;

    @ApiProperty({
        required: false,
        description: 'Filter by Maximum Price (Be sure to complete the minimum field)'
    })
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsOptional()
    maxPrice?: number;

    @ApiProperty({
        required: false,
        description: 'Filter By Category'
    })
    @IsString()
    @IsOptional()
    category: string;
}