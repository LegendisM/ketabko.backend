import { OmitType } from "@nestjs/swagger";
import { BaseUserDto } from "./base-user.dto";

export class UpdateUserDto extends OmitType(
    BaseUserDto,
    ['id']
) { }