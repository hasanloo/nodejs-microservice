import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {OrderController} from './order.controller';
import {OrderService} from './order.service';
import {OrderHistoryService} from './order-history.service';
import {Order} from './order.entity';
import {OrderHistory} from './order-history.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order, OrderHistory])],
    exports: [
        OrderService,
    ],
    providers: [OrderService, OrderHistoryService],
    controllers: [OrderController],
})
export class OrderModule {}
