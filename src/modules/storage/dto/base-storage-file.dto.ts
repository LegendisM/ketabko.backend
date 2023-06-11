import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsNumber, IsString, IsUUID, Length } from "class-validator";
import { StorageFileType } from "../interface/storage.interface";

export class BaseStorageFileDto {
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
        minLength: 0,
        maxLength: 60
    })
    @IsString()
    @Length(0, 60)
    detail: string;

    @ApiProperty({
        enum: StorageFileType,
        default: StorageFileType.Custom
    })
    @IsEnum(StorageFileType)
    type: StorageFileType;

    @ApiProperty()
    @IsString()
    mime: string;

    @ApiProperty()
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    size: number;

    @ApiProperty()
    @IsString()
    path: string;
}