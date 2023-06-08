import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authors')
@Controller({
    path: '/authors',
    version: '1'
})
export class AuthorController { }
