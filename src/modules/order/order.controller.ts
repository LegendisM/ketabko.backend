import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
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

@ApiTags('Orders')
@Controller({
    path: '/orders',
    version: '1'
})
export class OrderController {
    constructor(
        private orderService: OrderService
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
    async getOrderById(@Param('id') id: string) {
        // TODO: Policy Check
        return await this.orderService.findById(id, true);
    }

    @Post('/')
    async createOrder(
        @Body() createDto: CreateOrderDto,
        @CurrentUser() user: User
    ): Promise<Order> {
        return await this.orderService.create(createDto, user);
    }

    @Put('/:id')
    async updateOrder() {
        // TODO: Policy Check
        // TODO: handle to complete or fail order
    }

    @Delete('/:id')
    @Roles(Role.Admin)
    async removeOrder(@Param('id') id: string) {
        await this.orderService.remove(id);
    }
}
