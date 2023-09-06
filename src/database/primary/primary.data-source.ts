import { readFileSync } from "fs";
import { parse } from "dotenv";
import { DataSource } from "typeorm";

const config = parse(readFileSync('.env'));

export const PrimaryDataSource = new DataSource({
    type: 'postgres',
    host: config.PRIMARY_DB_HOST,
    port: +config.PRIMARY_DB_PORT,
    database: config.PRIMARY_DB_NAME,
    username: config.PRIMARY_DB_USERNAME,
    password: config.PRIMARY_DB_PASSWORD,
    entities: [],
    synchronize: config.NODE_ENV == "development",
    migrations: ['./migration/*{.ts,.js}'],
});