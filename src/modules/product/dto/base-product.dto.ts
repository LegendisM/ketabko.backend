import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsNumber, IsString, IsUUID, Length, Max, Min } from "class-validator";
import { ProductableType } from "../interface/product.interface";

export class BaseProductDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty({
        minLength: 1,
        maxLength: 35
    })
    @IsString()
    @Length(1, 35)
    title: string;

    @ApiProperty({
        minLength: 1,
        maxLength: 255
    })
    @IsString()
    @Length(1, 255)
    description: string;

    @ApiProperty({
        minimum: 0,
        maximum: 5000000
    })
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @Min(0)
    @Max(5000000)
    price: number;

    @ApiProperty({
        enum: ProductableType,
    })
    @IsEnum(ProductableType)
    entityType: ProductableType;

    @ApiProperty()
    @IsUUID()
    entityId: string;

    @ApiProperty({
        description: 'UUID Of the StorageFile for Cover Image'
    })
    @IsUUID()
    cover: string;
}