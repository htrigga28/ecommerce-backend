"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authController_1 = require("../controllers/authController");
exports.default = (function (router) {
    router.post('/auth/login', authController_1.login);
    router.post('/auth/signup', authController_1.register);
    router.post('/auth/logout', authController_1.logout);
});
