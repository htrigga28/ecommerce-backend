"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var objectId = mongoose_1.default.Types.ObjectId;
var productSchema = new mongoose_1.default.Schema({
    productId: {
        type: objectId,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    productDesc: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productQuantity: {
        type: Number,
        required: true,
        default: 0,
    },
    productImage: {
        type: String,
        required: true,
    },
    reviews: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Review',
        },
    ],
});
var ProductModel = mongoose_1.default.model('Product', productSchema);
exports.default = ProductModel;
