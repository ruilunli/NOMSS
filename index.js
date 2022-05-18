"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processOrders = void 0;
const mockService_1 = require("./Services/mockService");
const orderService_1 = require("./Services/orderService");
const productService_1 = require("./Services/productService");
const mockServices = new mockService_1.MockSefvice();
const orderService = new orderService_1.OrderService();
const productService = new productService_1.ProductService();
var products;
var orders;
var productPurchaseOrders = [];
function processOrders(orderIdsString) {
    try {
        var orderIds = JSON.parse(orderIdsString);
        // Load Mock Data
        products = mockServices.loadProducts();
        // For the orders return from the mock list, it will sort by date time ascending first. 
        // First filter the order type is not equal to Pending as we only process Pending orders
        // And we will process the order one by one and assuming the order will be processed based on the order creation date time
        orders = mockServices.loadOrders()
            .filter(order => order.status == "Pending")
            .sort((a, b) => {
            var aDate = new Date(a.dateCreated);
            var bDate = new Date(b.dateCreated);
            return aDate.getTime() - bDate.getTime();
        });
        // check if the passed order ids exist in master data, if not, return error
        var nonExistOrderIds = orderIds.filter(orderId => {
            return !orders.some(order => order.orderId == orderId);
        });
        var existOrderIds = orderIds.filter(orderId => {
            return orders.some(order => order.orderId == orderId);
        });
        // Get A list of exist order to be processed
        // The orders are sorted by creation date time already
        var existOrders = orders.filter(order => existOrderIds.some(o => o == order.orderId));
        var fulfillableOrders = [];
        var unfulfillableOrders = [];
        // Loop through the orders 
        // In this simple solution, we can't process the orders in parallell as we need to ensure the stock level is up to date
        existOrders.forEach(existOrder => {
            var fulfillable = orderService.checkOrder(existOrder, products);
            if (fulfillable) {
                fulfillableOrders.push(existOrder);
                // reduce the stock from product master list
                products = productService.UpdateProductStock(existOrder, products);
            }
            else {
                unfulfillableOrders.push(existOrder);
            }
            // Check product stock level to see if we need to generate purchase order
            productPurchaseOrders = productService.CheckAndGenerateNewProductPurchaseOrder(productPurchaseOrders, products);
        });
        console.log(`-----------------
                 Process Completed
                 -----------------
                 -----------------
                 -----------------
                 Completed Orders(Fulfillable):
                 ${JSON.stringify(fulfillableOrders)}
                 -----------------
                 -----------------
                 -----------------
                 Incompleted Orders(NonExist):
                 ${nonExistOrderIds}
                 -----------------
                 -----------------
                 -----------------
                 Incompleted Orders(UnfulfillableOrders):
                 ${JSON.stringify(unfulfillableOrders)}
                 -----------------
                 -----------------
                 -----------------
                 Product Purchase Orders:
                 ${JSON.stringify(productPurchaseOrders)}
                 -----------------
                 -----------------
                 -----------------
                `);
        console.log("Process Completed");
    }
    catch (e) {
        console.log(`-----------------
                     Error During Processing Orders
                     -----------------
                     -----------------
                     -----------------
                     ${e}
                     -----------------
                     -----------------
                     -----------------
                     `);
    }
}
exports.processOrders = processOrders;
