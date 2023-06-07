import { PickType } from "@nestjs/swagger";
import { BaseUserDto } from "./base-user.dto";

export class UpdateUserDto extends PickType(
    BaseUserDto,
    ['username', 'email', 'password']
) { }