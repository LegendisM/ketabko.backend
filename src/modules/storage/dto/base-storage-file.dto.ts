import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsString, IsUUID, Length } from "class-validator";

export class BaseStorageFileDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsString()
    @Length(1, 25)
    mime: string;

    @ApiProperty()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    size: number;

    @ApiProperty()
    @IsString()
    path: string;
}