"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processOrders = void 0;
const world = 'world';
const mockService_1 = require("./Services/mockService");
const mockServices = new mockService_1.MockSefvice();
var products;
var orders;
function processOrders(orderIds) {
    products = mockServices.loadProducts();
    orders = mockServices.loadOrders();
    console.log(orders);
}
exports.processOrders = processOrders;
