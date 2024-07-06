import OrderBusiness from "./business/orderBusiness.js";
import Order from "./entity/order.js";

const order = new Order({
  customerId: 'test',
  amount: 100.000,
  products: [{name: 'nissan gtr'}]
})

const orderBusiness = new OrderBusiness()
orderBusiness.create(order)

console.log(`Order has been created`, orderBusiness.orders)