"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const users_model_1 = __importDefault(require("../models/users.model"));
const util_1 = require("../utils/util");
class UserService {
    constructor() {
        this.users = users_model_1.default;
    }
    async findAllUser() {
        const users = await this.users.findAll();
        return users;
    }
    async findUserById(userId) {
        const findUser = await this.users.findByPk(userId);
        if (!findUser)
            throw new HttpException_1.default(409, "You're not user");
        return findUser;
    }
    async createUser(userData) {
        if (util_1.isEmptyObject(userData))
            throw new HttpException_1.default(400, "You're not userData");
        const findUser = await this.users.findOne({ where: { email: userData.email } });
        if (findUser)
            throw new HttpException_1.default(409, `You're email ${userData.email} already exists`);
        const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
        const createUserData = await this.users.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
        return createUserData;
    }
    async updateUser(userId, userData) {
        if (util_1.isEmptyObject(userData))
            throw new HttpException_1.default(400, "You're not userData");
        const hashedPassword = await bcrypt_1.default.hash(userData.password, 10);
        const updateUser = await this.users.update(Object.assign(Object.assign({}, userData), { password: hashedPassword }), { where: { id: userId } });
        if (!updateUser)
            throw new HttpException_1.default(409, "You're not user");
        return updateUser;
    }
    async deleteUserData(userId) {
        const deleteUser = await this.users.destroy({ where: { id: userId } });
        if (!deleteUser)
            throw new HttpException_1.default(409, "You're not user");
        return deleteUser;
    }
}
exports.default = UserService;
//# sourceMappingURL=users.service.js.map