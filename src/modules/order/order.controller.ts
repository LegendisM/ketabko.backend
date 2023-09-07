import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { IPagination } from './../../common/interface/pagination.interface';
import { OrderEntity } from './entity/order.entity';
import { Roles } from '../user/decorator/role.decorator';
import { Role } from '../user/interface/role.interface';
import { PaginationDto } from './../../common/dto/pagination.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { CurrentUser } from '../user/decorator/user.decorator';
import { UserEntity } from '../user/entity/user.entity';
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
    async getAllOrders(@Query() paginationDto: PaginationDto): Promise<IPagination<OrderEntity>> {
        return await this.orderService.findAll(paginationDto);
    }

    @Get('/me')
    @ApiOkResponse({
        description: 'Receive Array Of User Orders'
    })
    async getUserOrders(@CurrentUser() user: UserEntity): Promise<OrderEntity[]> {
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
        @Param('id', ParseUUIDPipe) id: string,
        @CurrentUser() user: UserEntity
    ): Promise<OrderEntity> {
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
        @CurrentUser() user: UserEntity
    ): Promise<OrderEntity> {
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
    async removeOrder(@Param('id', ParseUUIDPipe) id: string) {
        await this.orderService.remove(id);
    }
}
