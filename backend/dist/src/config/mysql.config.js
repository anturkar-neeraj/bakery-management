"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mySqlConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Anturkar@05',
    database: 'bakery_management',
    entities: ['dist/src/**/*.entity.js'],
    synchronize: true,
};
const jwtConfig = {
    secret: 'SECRET',
    signOptions: { expiresIn: '60s' }
};
exports.default = mySqlConfig;
//# sourceMappingURL=mysql.config.js.map