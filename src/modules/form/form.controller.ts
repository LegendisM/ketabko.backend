import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Forms')
@Controller({
    path: '/forms',
    version: '1'
})
export class FormController { }
