import { Repository } from 'typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderHistoryService } from './order-history.service';
import { Order } from './order.entity';
import { OrderHistory } from './order-history.entity';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
      const orderHistoryService = new OrderHistoryService(new Repository<OrderHistory>());
    orderService = new OrderService(new Repository<Order>(), orderHistoryService);
    orderController = new OrderController(orderService);
  });

  describe('findAll', () => {
    it('should return an array of orders', () => {
        const result = [
            {
                id: 1,
                name: "name4",
                address: "address4",
                price: 4,
                nmbr: "zo4o4hme",
                status: "cancelled",
                createTimestamp: "2019-02-03T12:40:22.669Z",
                updateTimestamp: "2019-02-03T12:40:22.669Z"
            }
        ];
      jest.spyOn(orderService, 'findAll').mockImplementation(() => result);
      expect(orderController.findAll()).toBe(result);
    });
  });
});
