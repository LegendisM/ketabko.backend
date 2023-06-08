import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller({
    path: 'products',
    version: '1'
})
export class ProductController { }
