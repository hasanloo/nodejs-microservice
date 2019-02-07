import { Repository } from 'typeorm';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { Payment } from './payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';

describe('PaymentController', () => {
  let paymentController: PaymentController;
  let paymentService: PaymentService;

  beforeEach(async () => {
    paymentService = new PaymentService(new Repository<Payment>());
    paymentController = new PaymentController(paymentService);
  });

  describe('findAll', () => {
    it('should return an array of payments', () => {
        const result = [
            {
                id: 1,
                name: "name4",
                address: "address4",
                price: 4,
                orderNumber: "zo4o4hme",
                status: "cancelled",
                createTimestamp: "2019-02-03T12:40:22.669Z",
                updateTimestamp: "2019-02-03T12:40:22.669Z"
            }
        ];
      jest.spyOn(paymentService, 'findAll').mockImplementation(() => result);
      expect(paymentController.findAll()).toBe(result);
    });
  });

  describe('create', () => {
    it('should return the payment', () => {
        const result = {
                name: "name4",
                address: "address4",
                price: 4,
                orderNumber: "zo4o4hme",
                status: "cancelled"
            };
      jest.spyOn(paymentService, 'add').mockImplementation(() => result);
      expect(paymentController.create(new CreatePaymentDto())).toBe(result);
    });
  });
});
