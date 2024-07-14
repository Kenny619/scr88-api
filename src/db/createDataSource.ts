import "reflect-metadata"
import { DataSource } from "typeorm"

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const createAppDataSource = async (entities: any[]) => {

    const AppDataSource = new DataSource({
        type: "mysql",
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        entities: entities,
        synchronize: true,
        logging: false,
    })

    // to initialize the initial connection with the database, register all entities
    // and "synchronize" database schema, call "initialize()" method of a newly created database
    // once in your application bootstrap
    await AppDataSource.initialize();

    return AppDataSource;
}

export default createAppDataSource;