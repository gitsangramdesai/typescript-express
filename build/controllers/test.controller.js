"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_service_1 = __importDefault(require("../services/test.service"));
class TestController {
    constructor() {
        this.testService = new test_service_1.default();
        this.findAll = async (req, res, next) => {
            try {
                const findAllData = await this.testService.findAll();
                res.status(200).json({ data: findAllData, message: 'findAll' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = TestController;
//# sourceMappingURL=test.controller.js.map