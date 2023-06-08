import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class BaseProductDto {
    @ApiProperty()
    @IsUUID()
    id: string;
}