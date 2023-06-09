import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID, Length } from "class-validator";

export class BaseCategoryDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty({
        minLength: 1,
        maxLength: 30
    })
    @IsString()
    @Length(1, 30)
    name: string;

    @ApiProperty({
        minLength: 1,
        maxLength: 60
    })
    @IsString()
    @Length(1, 60)
    slug: string;
}