import express from "express";
import AppDataSource from "@db/createDataSource.js";
import Scrapers from "@db/entity/scraper.js";
import "reflect-metadata";
const register = express.Router();

register.post("/single", async (req, res) => {

	const scraper = new Scrapers();
	Object.assign(scraper, req.body);
	console.log(scraper);

	try {
		const db = await AppDataSource([Scrapers]);
		await db.manager.save(scraper);
		res.status(200).json({ message: "Scraper registered" });
		await db.destroy();
	} catch (e) {
		res.status(500).json({ message: `Scraper registration failed: ${e}` });
	}


});


export default register;
