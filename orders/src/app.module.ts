import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    OrderModule,
  ],
})
export class AppModule {}
