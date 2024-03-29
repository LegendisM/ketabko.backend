import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entity/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus, OrderableType } from './interface/order.interface';
import { BookService } from '../book/service/book.service';
import { UserEntity } from '../user/entity/user.entity';
import { IPagination } from './../../common/interface/pagination.interface';
import { PaginationDto } from './../../common/dto/pagination.dto';
import { DatabaseSource } from 'src/database/interface/database.interface';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity, DatabaseSource.Primary) private orderRepository: Repository<OrderEntity>,
        private bookService: BookService
    ) { }

    async create({ entityId, entityType }: CreateOrderDto, user: UserEntity): Promise<OrderEntity> {
        const entity = await this.validateEntity(entityType, entityId, true);
        await this.preventDuplicate(entityType, entityId, user);
        const order = await this.orderRepository.create({ entityId, entityType, price: entity.price, user });
        return await this.orderRepository.save(order);
    }

    async findAll({ limit, page }: PaginationDto, mergeCondition: boolean = false): Promise<IPagination<OrderEntity>> {
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

    async findAllByUser(user: UserEntity): Promise<OrderEntity[]> {
        return await this.orderRepository.findBy({ user: { id: user.id } });
    }

    async findByEntity(
        entityType: OrderableType,
        entityId: string,
        user: UserEntity
    ): Promise<OrderEntity> {
        return await this.orderRepository.findOneBy({ entityType, entityId, user: { id: user.id } });
    }

    async findById(id: string, exception: boolean = false): Promise<OrderEntity> {
        const order = await this.orderRepository.findOneBy({ id });
        if (exception && !order) {
            throw new NotFoundException('order.invalid-id');
        }
        return order;
    }

    async update(id: string, updateDto: Partial<OrderEntity>): Promise<OrderEntity> {
        const order = await this.findById(id, true);
        Object.assign(order, updateDto);
        return await this.orderRepository.save(order);
    }

    async remove(id: string): Promise<OrderEntity> {
        const order = await this.findById(id, true);
        return await this.orderRepository.remove(order);
    }

    async preventDuplicate(entityType: OrderableType, entityId: string, user: UserEntity) {
        const order = await this.findByEntity(entityType, entityId, user);
        if (order) {
            throw new ConflictException('order.duplicate-order');
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
            throw new NotFoundException('order.invalid-entity');
        }
        return entity;
    }

    async validateForPayment(id: string, exception: boolean = false): Promise<boolean> {
        const order = await this.findById(id, true);
        const paymented = order.status == OrderStatus.Complete;
        if (exception && paymented) {
            throw new ConflictException('order.already-paymented');
        }
        return !paymented;
    }
}
