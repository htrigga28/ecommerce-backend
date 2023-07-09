"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userController_1 = require("../controllers/userController");
exports.default = (function (router) {
    router.get('/user/:id', userController_1.getUser);
    router.patch('/user/:id', userController_1.updateUser);
});
