import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Order, Status } from './order.entity';
import { OrderHistoryService } from './order-history.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private readonly orderHistoryService: OrderHistoryService,
    ) {}

    async findAll(): Promise<Order[]> {
        return await this.orderRepository.find();
    }

    async findOne(nmbr: string): Promise<Order> {
        return await this.orderRepository.findOne({nmbr});
    }

    async cancel(nmbr: string): Promise<UpdateResult> {
        this.orderHistoryService.add(nmbr, Status.CANCELLED);
        return this.orderRepository.update(
            { nmbr },
            { status: Status.CANCELLED, updateTimestamp: new Date() },
        );
    }

    async confirm(nmbr: string): Promise<UpdateResult> {
        this.orderHistoryService.add(nmbr, Status.CONFIRMED);
        return this.orderRepository.update(
            { nmbr },
            { status: Status.CONFIRMED, updateTimestamp: new Date() },
        );
    }

    add(dto: CreateOrderDto): Order {
        const order = new Order();
        order.name = dto.name;
        order.address = dto.address;
        order.price = dto.price;
        order.nmbr = Math.random().toString(36).substring(2, 6) + Math.random().toString(36).substring(2, 6);
        this.orderRepository.insert(order);
        this.orderHistoryService.add(order.nmbr, Status.CREATED);
        return order;
    }

    // TODO: this piece of code is too messy and not testable, need refactor
    doPayment(order: Order) {
        const self = this;
        const http = require('http');
        const data = JSON.stringify({
            name: order.name,
            address: order.address,
            price: order.price,
            order_number: order.nmbr,
        });

        // TODO: move payment address to env
        const options = {
            hostname: 'payments.local',
            port: 3000,
            path: '/payment',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length,
            },
        };
        const req = http.request(options, (res) => {
            let responseString = '';

            res.on('data', (responseData) => {
                responseString += responseData;
            });
            res.on('end', () => {
                const responseJson = JSON.parse(responseString);
                if (responseJson.status === 'confirmed') {
                    self.confirm(responseJson.orderNumber);
                    setTimeout(() => {
                        self.orderHistoryService.add(responseJson.orderNumber, 'delivered');
                        self.orderRepository.update(
                            { nmbr: responseJson.orderNumber },
                            { status: Status.DELIVERED, updateTimestamp: new Date() },
                        );

                    }, 5000);
                } else {
                    self.cancel(responseJson.orderNumber);
                }
            });
        });

        req.write(data);
        req.end();
    }

}
