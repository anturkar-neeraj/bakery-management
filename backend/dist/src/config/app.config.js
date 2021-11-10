"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = exports.mySqlConfig = void 0;
exports.mySqlConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Anturkar@05',
    database: 'bakery_management',
    entities: ['dist/src/**/*.entity.js'],
    synchronize: true,
};
exports.jwtConfig = {
    secret: 'SECRET',
    signOptions: { expiresIn: '60s' }
};
//# sourceMappingURL=app.config.js.map