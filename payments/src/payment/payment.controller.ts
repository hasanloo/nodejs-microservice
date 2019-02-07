import { Controller, Body, Param, Get, Post, Put } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() dto: CreatePaymentDto) {
    return this.paymentService.add(dto);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }
}
