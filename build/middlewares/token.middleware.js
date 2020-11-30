"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const users_model_1 = __importDefault(require("../models/users.model"));
async function tokenMiddleware(req, res, next) {
    const token = req.headers['authorization'];
    if (token) {
        const secret = process.env.JWT_SECRET;
        try {
            const verificationResponse = jsonwebtoken_1.default.verify(token, secret);
            const userId = verificationResponse.id;
            const ts = verificationResponse.ts;
            /*token expiry */
            const cts = new Date().getTime();
            const min = (cts - ts) / (60 * 1000);
            console.log('token time:' + min.toString());
            if (min > parseInt(process.env.TOKEN_EXPIRY_MIN)) {
                next(new HttpException_1.default(401, 'authentication token expired'));
            }
            else {
                const findUser = await users_model_1.default.findByPk(userId);
                if (findUser) {
                    req.user = findUser;
                    next();
                }
                else {
                    next(new HttpException_1.default(401, 'Wrong authentication token'));
                }
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
exports.default = tokenMiddleware;
//# sourceMappingURL=token.middleware.js.map