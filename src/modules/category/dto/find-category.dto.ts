import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";

export class FindCategoriesDto extends IntersectionType(PaginationDto) {
    @ApiProperty({
        required: false,
        description: 'Filter By Name'
    })
    @IsString()
    @IsOptional()
    name?: string;
}