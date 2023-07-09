"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
var userModel_1 = __importDefault(require("../models/userModel"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var jwtSecret = process.env.JWT_SECRET;
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, fullName, email, password, missingParams, fullNameExists, emailExists, salt, hashedPassword, newUser, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                _a = req.body, fullName = _a.fullName, email = _a.email, password = _a.password;
                missingParams = [];
                // Check if all required parameters are present
                if (!fullName) {
                    missingParams.push('fullName');
                }
                if (!email) {
                    missingParams.push('email');
                }
                if (!password) {
                    missingParams.push('password');
                }
                if (missingParams.length > 0) {
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: 'Missing required parameters', missingParams: missingParams })];
                }
                return [4 /*yield*/, userModel_1.default.findOne({ fullName: fullName })];
            case 1:
                fullNameExists = _b.sent();
                return [4 /*yield*/, userModel_1.default.findOne({ email: email })];
            case 2:
                emailExists = _b.sent();
                if (fullNameExists || emailExists) {
                    return [2 /*return*/, res.status(409).json({ message: 'user already exists' })];
                }
                return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
            case 3:
                salt = _b.sent();
                return [4 /*yield*/, bcrypt_1.default.hash(password, salt)];
            case 4:
                hashedPassword = (_b.sent()).toString();
                newUser = new userModel_1.default({
                    fullName: fullName,
                    email: email,
                    authentication: {
                        password: hashedPassword,
                    },
                });
                // Save the user to the database
                return [4 /*yield*/, newUser.save()];
            case 5:
                // Save the user to the database
                _b.sent();
                res
                    .status(201)
                    .json({ message: 'User created successfully', newUser: newUser })
                    .end();
                return [3 /*break*/, 7];
            case 6:
                error_1 = _b.sent();
                res.status(500).json({ message: error_1 });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, passwordMatches, token, err_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 5, , 6]);
                return [4 /*yield*/, userModel_1.default.findOne({ email: email }).select('+authentication.password +authentication.token')];
            case 2:
                user = _c.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ message: "User doesn't exist" })];
                }
                if (!jwtSecret || !((_b = user.authentication) === null || _b === void 0 ? void 0 : _b.password)) {
                    return [2 /*return*/, res.status(500).json({ message: 'Internal server error' })];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.authentication.password)];
            case 3:
                passwordMatches = _c.sent();
                if (!passwordMatches) {
                    return [2 /*return*/, res.status(401).json({ message: 'Incorrect password' })];
                }
                if (user.authentication.token) {
                    return [2 /*return*/, res.status(400).json({ message: 'Already logged in' })];
                }
                token = jsonwebtoken_1.default.sign({ email: email }, jwtSecret, {
                    expiresIn: '7d',
                });
                user.authentication.token = token;
                return [4 /*yield*/, user.save()];
            case 4:
                _c.sent();
                res.status(200).json({ message: 'Login successful', user: user });
                return [3 /*break*/, 6];
            case 5:
                err_1 = _c.sent();
                console.error(err_1);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var logout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, user, err_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                token = req.body.token;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, userModel_1.default.findOne({ 'authentication.token': token }).select('+authentication.token')];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ message: 'Invalid token' })];
                }
                if (!((_a = user === null || user === void 0 ? void 0 : user.authentication) === null || _a === void 0 ? void 0 : _a.token)) {
                    return [2 /*return*/, res.status(400).json({ message: 'User is not logged in' })];
                }
                user.authentication.token = '';
                return [4 /*yield*/, user.save()];
            case 3:
                _b.sent();
                res.status(200).json({ message: 'Logout successful' });
                return [3 /*break*/, 5];
            case 4:
                err_2 = _b.sent();
                console.error(err_2);
                res.status(500).json({ message: 'Internal server error' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.logout = logout;
