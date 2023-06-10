import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID, Length } from "class-validator";

export class BaseAuthorDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty({
        description: 'Author Name',
        minLength: 1,
        maxLength: 30
    })
    @IsString()
    @Length(1, 30)
    name: string;

    @ApiProperty({
        description: 'Author About Text',
        minLength: 1,
        maxLength: 255
    })
    @IsString()
    @Length(1, 255)
    description: string;

    @ApiProperty({
        description: 'UUID Of the StorageFile for Avatar Image'
    })
    @IsUUID()
    avatar: string;
}