import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';
import { OrderHistory } from './order-history.entity';

@Injectable()
export class OrderHistoryService {
    constructor(
        @InjectRepository(OrderHistory)
        private readonly orderHistoryRepository: Repository<OrderHistory>,
    ) {}

    add(orderNumber: string, status: string): Promise<InsertResult> {
        return this.orderHistoryRepository.insert({
            status,
            orderNumber,
        });
    }
}
