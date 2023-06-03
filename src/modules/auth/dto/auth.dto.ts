import { PickType } from "@nestjs/swagger";
import { BaseUserDto } from "../../user/dto/base-user.dto";

export class AuthDto extends PickType(
    BaseUserDto,
    ['username', 'password']
) { }