"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var productController_1 = require("../controllers/productController");
exports.default = (function (router) {
    router.get('/products', productController_1.getProducts);
    router.get('/products/:id', productController_1.getProductById);
    router.get('/products/:id/review', productController_1.getProductById);
});
