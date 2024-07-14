import Scrapers from "./entity/scraper.js"
import AppDataSource from "./createDataSource.js"
const repo = AppDataSource.getRepository(Scrapers)


const firstPhoto = await repo.findOneBy({
    name: "test",
})
console.log("First photo from the db: ", firstPhoto?.id)

await AppDataSource.destroy()