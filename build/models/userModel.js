"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    authentication: {
        password: {
            type: String,
            required: true,
            select: false,
        },
        token: {
            type: String,
            select: false,
        },
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    // address: {
    //   street: {
    //     type: String,
    //     required: true,
    //   },
    //   city: {
    //     type: String,
    //     required: true,
    //   },
    //   state: {
    //     type: String,
    //     required: true,
    //   },
    //   zipCode: {
    //     type: String,
    //     required: true,
    //   },
    //   country: {
    //     type: String,
    //     required: true,
    //   },
    // },
    // phoneNumber: {
    //   type: String,
    //   required: true,
    // },
    // dateOfBirth: {
    //   type: Date,
    //   required: true,
    // },
}, {
    timestamps: true,
});
userSchema.pre('save', function (next) {
    var fullName = this.fullName.trim();
    // Split the full name into first and last name
    var splitName = fullName.split(' ');
    this.firstName = splitName[0];
    this.lastName = splitName[splitName.length - 1];
    next();
});
var User = mongoose_1.default.model('User', userSchema);
exports.default = User;
