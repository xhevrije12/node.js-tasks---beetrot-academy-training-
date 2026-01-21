const EventEmitter = require('events');

class OrderService extends EventEmitter {
     createOrder(order){
        console.log("Order is creating");
        this.emit("orderCreated", order);
     }
}

const orderService = new OrderService();

orderService.on("orderCreated", (order)=> {
    console.log("Order created", order)
})
orderService.emit("orderCreated", { order: 1 });