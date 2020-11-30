"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const users_model_1 = __importDefault(require("./users.model"));
const test_model_1 = __importDefault(require("./test.model"));
const sequelize = new sequelize_typescript_1.Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    timezone: '+09:00',
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    },
    pool: {
        min: 0,
        max: 30,
        idle: 10000,
        acquire: 30000,
    },
});
sequelize.addModels([users_model_1.default, test_model_1.default]);
sequelize.authenticate().catch((err) => {
    console.error('Unable to connect to the database:', err);
});
exports.default = sequelize;
//# sourceMappingURL=index.model.js.map