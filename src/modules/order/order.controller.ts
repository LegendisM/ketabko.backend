import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { IPagination } from 'src/common/interface/pagination.interface';
import { Order } from './entity/order.entity';
import { Roles } from '../user/decorator/role.decorator';
import { Role } from '../user/interface/role.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { CurrentUser } from '../user/decorator/user.decorator';
import { User } from '../user/entity/user.entity';
import { PolicyService } from '../policy/policy.service';
import { PolicyAction } from '../policy/interface/policy.interface';
import { Auth } from '../auth/decorator/auth.decorator';

@ApiTags('Orders')
@Controller({
    path: '/orders',
    version: '1'
})
@Auth()
export class OrderController {
    constructor(
        private orderService: OrderService,
        private policyService: PolicyService
    ) { }

    @Get('/')
    @Roles(Role.Admin)
    @ApiOkResponse({
        description: 'Receive Array Of Orders With Paginate'
    })
    async getAllOrders(@Query() paginationDto: PaginationDto): Promise<IPagination<Order>> {
        return await this.orderService.findAll(paginationDto);
    }

    @Get('/me')
    @ApiOkResponse({
        description: 'Receive Array Of User Orders'
    })
    async getUserOrders(@CurrentUser() user: User): Promise<Order[]> {
        return await this.orderService.findAllByUser(user);
    }

    @Get('/:id')
    @ApiOkResponse({
        description: 'Receive Order Instance'
    })
    @ApiNotFoundResponse({
        description: 'Order Not Found'
    })
    @ApiForbiddenResponse({
        description: 'Invalid User Policy Access'
    })
    async getOrderById(
        @Param('id') id: string,
        @CurrentUser() user: User
    ): Promise<Order> {
        const order = await this.orderService.findById(id, true);
        this.policyService.forOrder(PolicyAction.Read, user, order, true);
        return order;
    }

    @Post('/')
    @ApiCreatedResponse({
        description: 'Order Created Successfully'
    })
    @ApiNotFoundResponse({
        description: 'Not Found Entity'
    })
    @ApiConflictResponse({
        description: 'Already Order Paymented'
    })
    async createOrder(
        @Body() createDto: CreateOrderDto,
        @CurrentUser() user: User
    ): Promise<Order> {
        return await this.orderService.create(createDto, user);
    }

    @Delete('/:id')
    @Roles(Role.Admin)
    @ApiOkResponse({
        description: 'Order Removed Successfully'
    })
    @ApiNotFoundResponse({
        description: 'Order Not Found'
    })
    async removeOrder(@Param('id') id: string) {
        await this.orderService.remove(id);
    }
}
