import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
    async getAllOrders(@Query() paginationDto: PaginationDto): Promise<IPagination<Order>> {
        return await this.orderService.findAll(paginationDto);
    }

    @Get('/me')
    async getUserOrders(@CurrentUser() user: User): Promise<Order[]> {
        return await this.orderService.findAllByUser(user);
    }

    @Get('/:id')
    async getOrderById(
        @Param('id') id: string,
        @CurrentUser() user: User
    ): Promise<Order> {
        const order = await this.orderService.findById(id, true);
        this.policyService.forOrder(PolicyAction.Read, user, order, true);
        return order;
    }

    @Post('/')
    async createOrder(
        @Body() createDto: CreateOrderDto,
        @CurrentUser() user: User
    ): Promise<Order> {
        return await this.orderService.create(createDto, user);
    }

    // TODO
    // @Put('/:id')
    // async updateOrder(
    //     @Param('id') id: string,
    //     @CurrentUser() user: User
    // ) {
    //     const order = await this.orderService.findById(id, true);
    //     this.policyService.forOrder(PolicyAction.Update, user, order, true);
    //     // this.orderService.update();
    //     // TODO: handle to complete or fail order
    // }

    @Delete('/:id')
    @Roles(Role.Admin)
    async removeOrder(@Param('id') id: string) {
        await this.orderService.remove(id);
    }
}
