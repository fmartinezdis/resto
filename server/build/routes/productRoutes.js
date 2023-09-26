"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productsController_1 = require("../controllers/productsController");
class ProductsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', productsController_1.productsController.save);
    }
}
const productsRoutes = new ProductsRoutes();
exports.default = productsRoutes.router;
