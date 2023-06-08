import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, IsUUID, Length } from "class-validator";
import { FormItemType } from "../interface/form-item.interface";

export class BaseFormItemDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty({
        enum: FormItemType
    })
    @IsEnum(FormItemType)
    type: FormItemType;

    @ApiProperty({
        minLength: 1,
        maxLength: 30
    })
    @IsString()
    @Length(1, 30)
    helper: string;
}