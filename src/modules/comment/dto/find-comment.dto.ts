import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsUUID } from "class-validator";
import { PaginationDto } from "./../../../common/dto/pagination.dto";
import { CommentableType } from "../interface/comment.interface";

export class FindCommentsDto extends IntersectionType(PaginationDto) {
    @ApiProperty({
        required: false,
        enum: CommentableType,
        default: CommentableType.Book,
        description: 'Filter By Entity Type'
    })
    @IsEnum(CommentableType)
    @IsOptional()
    entityType: CommentableType;

    @ApiProperty({
        required: false,
        description: 'Filter By Entity Id'
    })
    @IsUUID()
    @IsOptional()
    entityId: string;

    @ApiProperty({
        required: false,
        description: 'Filter By User With UUID'
    })
    @IsUUID()
    @IsOptional()
    user: string;
}