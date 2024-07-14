import AppDataSource from "./createDataSource.js";
import Scrapers from "./entity/scraper.js";
//import "reflect-metadata";


const scraper = new Scrapers()
scraper.name = "test"
scraper.entryUrl = "https://www.google.com"
scraper.rootUrl = "https://www.google.com"
scraper.language = "JP"
scraper.siteType = "links"
scraper.nextPageType = "last"
scraper.lastUrlSelector = "a.next"
scraper.lastPageNumberRegExp = "\/d.*"
scraper.tagFiltering = false
scraper.tagCollect = true
scraper.indexLinkSelector = "a.articles"
scraper.articleTitleSelector = "h2.title"
scraper.articleBodySelector = "div.body"
scraper.articleTagSelector = "div.tags"
scraper.frequency = "weekly"
scraper.status = "suspended"

await AppDataSource.manager.save(scraper);
console.log(`inserted id:${scraper.id}`);
await AppDataSource.destroy();