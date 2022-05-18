export class OrderService {
    checkOrder(order: Order, products: Product[]): boolean {
        var fulfillable = true;
        order.items.forEach(item=> {
            var product = products.find(p=> p.productId == item.productId);
            
            // If order item's product does not exist in master product list
            // Order can't be processed
            if(!product) {
                fulfillable = false;
            } else if(product.quantityOnHand < item.quantity) { 
                // If product quantityOnHand is less than the order item required quantity
                // This particular item cannot be fulfill
                fulfillable = false;
            }
            
        })
        return fulfillable;
    }
}