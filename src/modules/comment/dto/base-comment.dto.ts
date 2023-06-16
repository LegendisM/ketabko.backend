import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, IsUUID, Length } from "class-validator";
import { CommentableType } from "../interface/comment.interface";

export class BaseCommentDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty({
        minLength: 1,
        maxLength: 50
    })
    @IsString()
    @Length(1, 50)
    title: string;

    @ApiProperty({
        minLength: 1,
        maxLength: 50
    })
    @IsString()
    @Length(1, 255)
    message: string;

    @ApiProperty({
        enum: CommentableType,
        default: CommentableType.Book,
        description: 'Type Of the Entity'
    })
    @IsEnum(CommentableType)
    entityType: CommentableType;

    @ApiProperty({
        description: 'UUID Of the Entity'
    })
    @IsUUID()
    entityId: string;
}