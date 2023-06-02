import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";

@ApiTags('Users')
@Controller({
    path: '/users',
    version: '1'
})
export class UserController {
    constructor(
        private userService: UserService
    ) { }
}