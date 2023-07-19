import { IsString, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class BaseBookSectionDataDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsString()
    value: string;

    @ApiProperty({
        description: 'UUID Of Section'
    })
    @IsUUID()
    section: string;
}