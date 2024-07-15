import AppDataSource from "./createDataSource.js";
import Scrapers from "./entity/scraper.js";

const input = {
    name: "secondtest",
    category: "Jlores",
    entryUrl: "https://www.google.com",
    rootUrl: "https://www.google.com",
    language: "JP",
    siteType: "links",
    nextPageType: "last",
    lastUrlSelector: "a.next",
    lastPageNumberRegExp: "\/d.*",
    tagFiltering: false,
    tagCollect: true,
    indexLinkSelector: "a.articles",
    articleTitleSelector: "h2.title",
    articleBodySelector: "div.body",
    articleTagSelector: "div.tags",
    frequency: "weekly",
    status: "suspended"
};

const scraper = new Scrapers();
Object.assign(scraper, input);

try {
    const db = await AppDataSource([Scrapers]);
    await db.manager.save(scraper);
    console.log(`inserted id:${scraper.id}`);
    await db.destroy();

} catch (error) {
    console.error(error);
}