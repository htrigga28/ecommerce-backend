"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userRoutes_1 = __importDefault(require("./userRoutes"));
var authRoutes_1 = __importDefault(require("./authRoutes"));
var productRoutes_1 = __importDefault(require("./productRoutes"));
var router = express_1.default.Router();
exports.default = (function () {
    (0, userRoutes_1.default)(router);
    (0, authRoutes_1.default)(router);
    (0, productRoutes_1.default)(router);
    return router;
});
