import { Module } from '@nestjs/common';
import { PaymentModule } from './payment/payment.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    PaymentModule,
  ],
})
export class AppModule {}
