import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Payment, Status } from './payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
    ) {}

    async findAll(): Promise<Payment[]> {
        return await this.paymentRepository.find();
    }

    async add(dto: CreatePaymentDto): Promise<Payment> {
        return await this.paymentRepository.findOneOrFail({ orderNumber: dto.orderNumber }).then((payment) => {
            return payment;
        }, function() {
            const payment = new Payment();
            payment.name = dto.name;
            payment.address = dto.address;
            payment.price = dto.price;
            payment.orderNumber = dto.orderNumber;
            payment.status = Math.random() >= 0.5 ? Status.CONFIRMED : Status.CANCELLED;
            this.paymentRepository.insert(payment);
            return payment;
        }.bind(this));
    }
}
