"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const test_controller_1 = __importDefault(require("../controllers/test.controller"));
const token_middleware_1 = __importDefault(require("../middlewares/token.middleware"));
class TestRoute {
    constructor() {
        this.path = '/test';
        this.router = express_1.Router();
        this.testController = new test_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, token_middleware_1.default, this.testController.findAll);
    }
}
exports.default = TestRoute;
//# sourceMappingURL=test.route.js.map