"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockSefvice = void 0;
const data_json_1 = __importDefault(require("../data.json"));
// This is the mock service to load the data from file
// In real world, it should fetch from the api
class MockSefvice {
    loadProducts() {
        return data_json_1.default.products;
    }
    loadOrders() {
        return data_json_1.default.orders;
    }
}
exports.MockSefvice = MockSefvice;
