"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const users_model_1 = __importDefault(require("../models/users.model"));
async function authMiddleware(req, res, next) {
    const cookies = req.cookies;
    if (cookies && cookies.Authorization) {
        const secret = process.env.JWT_SECRET;
        try {
            const verificationResponse = jsonwebtoken_1.default.verify(cookies.Authorization, secret);
            const userId = verificationResponse.id;
            const findUser = await users_model_1.default.findByPk(userId);
            if (findUser) {
                req.user = findUser;
                next();
            }
            else {
                next(new HttpException_1.default(401, 'Wrong authentication token'));
            }
        }
        catch (error) {
            next(new HttpException_1.default(401, 'Wrong authentication token'));
        }
    }
    else {
        next(new HttpException_1.default(404, 'Authentication token missing'));
    }
}
exports.default = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map