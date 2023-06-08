import { IsString, Length } from "class-validator";
import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { BaseProductDto } from "src/modules/product/dto/base-product.dto";

export class BaseBookDto extends IntersectionType(BaseProductDto) {
    @ApiProperty({
        description: 'book summary text',
        minLength: 1,
        maxLength: 255
    })
    @IsString()
    @Length(1, 255)
    summary: string;

    @ApiProperty({
        description: 'book image url'
    })
    @IsString()
    cover: string;

    @ApiProperty({
        description: 'book audio url'
    })
    @IsString()
    audio: string;
}