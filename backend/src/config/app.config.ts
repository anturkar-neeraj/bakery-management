import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

export const mySqlConfig: MysqlConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Anturkar@05',
    database: 'bakery_management',
    entities: ['dist/src/**/*.entity.js'],
    synchronize: true,
}

export const jwtConfig: any = {
    secret: 'SECRET',
    signOptions: { expiresIn: '60s' }
}

