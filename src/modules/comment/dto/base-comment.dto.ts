import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID, Length } from "class-validator";

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
}