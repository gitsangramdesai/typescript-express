"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
function validateEnv() {
    envalid_1.cleanEnv(process.env, {
        NODE_ENV: envalid_1.str(),
        MYSQL_USER: envalid_1.str(),
        MYSQL_PASSWORD: envalid_1.str(),
        MYSQL_HOST: envalid_1.str(),
        MYSQL_DATABASE: envalid_1.str(),
        JWT_SECRET: envalid_1.str(),
        PORT: envalid_1.port(),
    });
}
exports.default = validateEnv;
//# sourceMappingURL=validateEnv.js.map