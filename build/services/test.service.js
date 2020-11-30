"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_model_1 = __importDefault(require("../models/test.model"));
class TestService {
    constructor() {
        this.tests = test_model_1.default;
    }
    async findAll() {
        const all = await this.tests.findAll();
        return all;
    }
}
exports.default = TestService;
//# sourceMappingURL=test.service.js.map