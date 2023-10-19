import { DataSource } from "typeorm";

export const SecondaryDataSource = new DataSource({
    type: 'mongodb',
    host: 'localhost',
    port: +1,
    database: 'test',
    username: 'test',
    password: 'test',
    entities: [],
    synchronize: true,
    migrations: [`${__dirname}/migration/*{.ts,.js}`],
})