import express from "express";
import * as val from "@/utils/validator/helper.validator.js";

declare module "express-session" {
    interface SessionData {
        entryUrl?: string;
        articleUrl?: string;
        indexDOM?: string;
        articleDOM?: string;
        lastUrl?: string;
    }
}
//const app = express();
const validator = express.Router();


validator.post("/name", async (req, res) => res.send(await val.isNameValid(req.body.input)));

validator.post("/url", async (req, res) => {
    const vresult = await val.isUrlValid(req.body.input);
    if (vresult.pass && req.body.key === "entryUrl") {
        req.session.entryUrl = req.body.input;
        req.session.articleUrl = req.body.input; //placeholder.  If the user chooses siteType="links", this will be updated with correct article URL.

        val.getDOM(req.body.input)
            .then((dom) => {
                req.session.indexDOM = dom;
                //	req.session.save((err) => err && console.log(err));
                res.send(vresult);
            })
            .catch((e) => res.send({ pass: false, errMsg: e }));
    } else {
        res.send(vresult);
    }
});

validator.post("/lasturl", (req, res) => {
    if (req.session.indexDOM) {
        const vresult = val.isSelectorValid("link", req.session.indexDOM, req.body.input);
        if (vresult.pass) req.session.lastUrl = vresult.result as string;
        res.send(vresult);
    } else {
        res.send({ pass: false, errMsg: val.errorMsg.missing.entryUrl });
    }
});

validator.post("/lasturlregex", async (req, res) => {
    if (req.session.lastUrl) {
        let vresult: result;
        vresult = val.isRegexValid(req.session.lastUrl, req.body.input);
        vresult = await val.generateArticleDOM(req.session, vresult);
        res.send(vresult);
    } else {
        res.send({ pass: false, errMsg: val.errorMsg.missing.lastUrl });
    }
});

validator.post("/parameter", async (req, res) => {
    if (req.session.entryUrl) {
        let vresult: result;
        vresult = await val.isURLparamValid(req.session.entryUrl, req.body.input);
        vresult = await val.generateArticleDOM(req.session, vresult);
        res.send(vresult);
    } else {
        res.send({ pass: false, errMsg: val.errorMsg.missing.entryUrl });
    }
});

validator.post("/pagenuminurl", async (req, res) => {
    if (req.session.entryUrl) {
        let vresult: result;
        vresult = await val.isPageNumInUrl(req.session.entryUrl, req.body.input);
        vresult = await val.generateArticleDOM(req.session, vresult);
        res.send(vresult);
    } else {
        res.send({ pass: false, errMsg: val.errorMsg.missing.entryUrl });
    }
});

validator.post("/nexturlregex", async (req, res) => {
    if (req.session.entryUrl) {
        let vresult: result;
        vresult = val.isRegexValid(req.session.entryUrl, req.body.input);
        vresult = await val.generateArticleDOM(req.session, vresult);
        res.send(vresult);
    } else {
        res.send({ pass: false, errMsg: val.errorMsg.missing.entryUrl });
    }
});

validator.post("/nexturl", async (req, res) => {
    if (req.session.indexDOM) {
        let vresult: result;
        vresult = val.isSelectorValid("link", req.session.indexDOM, req.body.input);
        vresult = await val.generateArticleDOM(req.session, vresult);
        res.send(vresult);
    } else {
        res.send({ pass: false, errMsg: val.errorMsg.missing.entryUrl });
    }
});

validator.post("/indexlinks", async (req, res) => {
    if (req.session.indexDOM) {
        const vresult = val.isSelectorValid("links", req.session.indexDOM, req.body.input);
        if (vresult.pass) {
            req.session.articleUrl = vresult.result[0];
            val.getDOM(req.session.articleUrl)
                .then((dom) => {
                    req.session.articleDOM = dom;
                    res.send(vresult);
                })
                .catch((e) => res.send({ pass: false, errMsg: e }));
        }
    } else {
        res.send({ pass: false, errMsg: val.errorMsg.missing.entryUrl });
    }
});

validator.post("/link", (req, res) => {
    req.session.indexDOM ? res.send(val.isSelectorValid("link", req.session.indexDOM, req.body.input)) : res.send({ pass: false, errMsg: val.errorMsg.missing.entryUrl });
});

validator.post("/links", (req, res) => {
    req.session.indexDOM ? res.send(val.isSelectorValid("links", req.session.indexDOM, req.body.input)) : res.send({ pass: false, errMsg: val.errorMsg.missing.entryUrl });
});

validator.post("/text", (req, res) => {
    req.session.articleDOM ? res.send(val.isSelectorValid("text", req.session.articleDOM, req.body.input)) : res.send({ pass: false, errMsg: val.errorMsg.missing.entryUrl });
});

validator.post("/texts", (req, res) => {
    req.session.articleDOM ? res.send(val.isSelectorValid("texts", req.session.articleDOM, req.body.input)) : res.send({ pass: false, errMsg: val.errorMsg.missing.entryUrl });
});

validator.post("/articleblock", (req, res) => {
    if (req.session.articleDOM) {
        const vresult = val.isSelectorValid("nodes", req.session.articleDOM, req.body.input);
        if (vresult.pass) {
            req.session.articleDOM = vresult.result[0] as string;
        }
        res.send(vresult);
    } else {
        res.send({ pass: false, errMsg: val.errorMsg.missing.entryUrl });
    }
});

export default validator;
