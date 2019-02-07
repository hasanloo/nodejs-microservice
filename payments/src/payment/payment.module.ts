import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PaymentController} from './payment.controller';
import {PaymentService} from './payment.service';
import {Payment} from './payment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Payment])],
    exports: [
        PaymentService,
    ],
    providers: [PaymentService],
    controllers: [PaymentController],
})
export class PaymentModule {}
