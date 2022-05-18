import dataJson from '../data.json'; 

// This is the mock service to load the data from file
// In real world, it should fetch from the api
export class MockSefvice {

    loadProducts(): Product[] {
        return dataJson.products;
    }
    
   loadOrders(): Order[] {
       return dataJson.orders;
    }
    
}