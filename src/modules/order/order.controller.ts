import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller({
    path: '/orders',
    version: '1'
})
export class OrderController { }
