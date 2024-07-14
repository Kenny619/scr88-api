import mysql from "mysql2/promise";
import { Client } from "pg";

//mysql
type R<T extends "mysql" | "pg"> = T extends "mysql" ? mysql.Connection : T extends "pg" ? Client : never;
async function dbConnect<T extends "mysql" | "pg">(dbname: T): Promise<R<T>> {

    const mysqlenv = {
        host: process.env.DB_HOST as string,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        database: "scr88",
        namedPlaceholders: true,
    };

    const pgClient = new Client({
        host: process.env.DB_HOST as string,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        database: "scr88",
    });

    if (dbname === "mysql") {
        return await mysql.createConnection(mysqlenv) as R<T>;
    }

    await pgClient.connect();
    return pgClient as R<T>;

}

export default dbConnect;