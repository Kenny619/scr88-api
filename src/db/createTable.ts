import "reflect-metadata"
import { DataSource } from "typeorm"
import Scraper from "@/db/entity/scraper.js"
import SiteCategory from "@/db/entity/siteCategory.js"
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

    try {
        await AppDataSource.initialize();
        console.log("Database initialized");
    } catch (error) {
        console.error("Error initializing database", error);
    }
    AppDataSource.destroy();
}

createAppDataSource([Scraper]);
