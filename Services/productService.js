"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
class ProductService {
    UpdateProductStock(order, products) {
        order.items.forEach(item => {
            var product = products.find(p => p.productId == item.productId);
            // reduce stock quantity
            product.quantityOnHand = product.quantityOnHand - item.quantity;
        });
        return products;
    }
    CheckAndGenerateNewProductPurchaseOrder(existingProductPurchaseOrders, products) {
        var newProductPurchaseOrders = [];
        products.forEach(product => {
            // Check current product stock level to see if we need to generate new product purchase order
            if (product.reorderThreshold < product.quantityOnHand) {
                var orderExist = existingProductPurchaseOrders.some(o => o.productId == product.productId);
                //Assume we only generate one product purchase order per product in one process run
                if (!orderExist) {
                    newProductPurchaseOrders.push({ productPurchaseOrderId: Math.floor(Math.random() * 100), productId: product.productId, quantity: product.reorderAmount });
                }
            }
        });
        return existingProductPurchaseOrders.concat(newProductPurchaseOrders);
    }
}
exports.ProductService = ProductService;
