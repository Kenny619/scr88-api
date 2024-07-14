import express from "express";
import siteCategory from "@db/entity/siteCategory.js";
import createAppDataSource from "@db/createDataSource.js";
const category = express.Router();

const db = await createAppDataSource([siteCategory]);
const repo = db.getRepository(siteCategory)


category.post("/names", async (_, res) => {

    const allNames = await repo.find({
        select: {
            name: true
        }
    });

    res.send(allNames.map(name => name.name));
});

export default category;