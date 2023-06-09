import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, IsUUID, Length } from "class-validator";
import { FormItemComponent } from "../interface/form-item.interface";

export class BaseFormItemDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty({
        enum: FormItemComponent
    })
    @IsEnum(FormItemComponent)
    component: FormItemComponent;

    @ApiProperty({
        minLength: 1,
        maxLength: 30
    })
    @IsString()
    @Length(1, 30)
    helper: string;
}