import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { Auth } from "../auth/decorator/auth.decorator";

@ApiTags('Users')
@Controller({
    path: '/users',
    version: '1'
})
@Auth()
export class UserController {
    constructor(
        private userService: UserService
    ) { }
}