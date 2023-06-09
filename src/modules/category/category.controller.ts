import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller({
    path: '/categories',
    version: '1'
})
export class CategoryController { }
