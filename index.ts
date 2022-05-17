const world = 'world';
import { MockSefvice } from "./Services/mockService"

const mockServices = new MockSefvice();

var products: Product[];
var orders: Order[];
export function processOrders(orderIds: number[]) {


    products = mockServices.loadProducts();
    
    orders = mockServices.loadOrders();
    
    console.log(orders);
}



