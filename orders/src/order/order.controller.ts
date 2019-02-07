import { Controller, Body, Param, Get, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    const order = this.orderService.add(dto);
    this.orderService.doPayment(order);
    return order;
  }

  @Put('cancel/:number')
  cancel(@Param('number') nmbr) {
    this.orderService.cancel(nmbr);
    return {status: true};
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get('status/:number')
  findOne(@Param('number') nmbr) {
    return this.orderService.findOne(nmbr);
  }
}
