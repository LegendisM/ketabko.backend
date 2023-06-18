import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus, OrderableType } from './interface/order.interface';
import { BookService } from '../book/book.service';
import { User } from '../user/entity/user.entity';
import { IPagination } from 'src/common/interface/pagination.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        private bookService: BookService
    ) { }

    async create({ entityId, entityType }: CreateOrderDto, user: User): Promise<Order> {
        const entity = await this.validateEntity(entityType, entityId, true);
        await this.preventDuplicate(entityType, entityId, user);
        const order = await this.orderRepository.create({ entityId, entityType, price: entity.price, user });
        return await this.orderRepository.save(order);
    }

    async findAll({ limit, page }: PaginationDto): Promise<IPagination<Order>> {
        const orders = await this.orderRepository.find({
            skip: (page - 1) * limit,
            take: limit - 1
        });
        const ordersCount = await this.orderRepository.count();
        return {
            items: orders,
            limit: limit,
            page: page,
            total: Math.ceil(ordersCount / limit)
        }
    }

    async findAllByUser(user: User): Promise<Order[]> {
        return await this.orderRepository.findBy({ user: { id: user.id } });
    }

    async findByEntity(
        entityType: OrderableType,
        entityId: string,
        user: User
    ): Promise<Order> {
        return await this.orderRepository.findOneBy({ entityType, entityId, user: { id: user.id } });
    }

    async findById(id: string, exception: boolean = false): Promise<Order> {
        const order = await this.orderRepository.findOneBy({ id });
        if (exception && !order) {
            throw new NotFoundException(`Invalid FindOne Order With Id ${id}`);
        }
        return order;
    }

    async update(id: string, updateDto: Partial<Order>): Promise<Order> {
        const order = await this.findById(id, true);
        Object.assign(order, updateDto);
        return await this.orderRepository.save(order);
    }

    async remove(id: string): Promise<Order> {
        const order = await this.findById(id, true);
        return await this.orderRepository.remove(order);
    }

    async preventDuplicate(entityType: OrderableType, entityId: string, user: User) {
        const order = await this.findByEntity(entityType, entityId, user);
        if (order) {
            throw new ConflictException(`Duplicate Order With Same Entity By Id ${order}`);
        }
    }

    async validateEntity(entityType: OrderableType, entityId: string, exception: boolean = false): Promise<unknown & { price: number }> {
        let entity: unknown & { price: number };
        switch (entityType) {
            case OrderableType.Book:
                entity = await this.bookService.findById(entityId);
                break;
        }
        if (exception && !entity) {
            throw new NotFoundException(`Invalid FindOne Entity With Id ${entityId} For Type ${entityType}`);
        }
        return entity;
    }

    async validateForPayment(id: string, exception: boolean = false): Promise<boolean> {
        const order = await this.findById(id, true);
        const state = order.status == OrderStatus.Complete;
        if (exception && !state) {
            throw new ConflictException('You Already Paid For This Order');
        }
        return state;
    }
}
