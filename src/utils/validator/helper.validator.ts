import { getSerializedDOM, isURLalive, extract, extractAll } from "../registerHelper.js";
import { z } from "zod";
import Scrapers from "@db/entity/scraper.js"
import createAppDataSource from "@db/createDataSource.js"

const db = await createAppDataSource([Scrapers]);
const repo = db.getRepository(Scrapers)


/** 
 Checks if the registration name doesn't exist in DB and can be used.
 @param name - The name to check
 @returns { pass: true; result: string } if the name is valid and not already in use
 @returns { pass: false; errMsg: string } if the name is invalid or already in use
 */
export async function isNameValid(input: string): Promise<prevalResult<string>> {

    const result = await repo.findOneBy({
        name: input
    })
    console.log(input, result);

    //await AppDataSource.destroy();
    return (result !== null) ? { pass: false, errMsg: "This name is already in use" } : { pass: true, result: "Valid name" };
}

/** 
    Checks if a passed URL is valid and alive.
    @param url - The URL to check
    @returns { pass: true; result: string } if the URL is valid and alive
    @returns { pass: false; errMsg: string } if the URL is invalid or not alive
*/
export async function isUrlValid(url: string): Promise<prevalResult<string>> {

    if (z.string().url().safeParse(url).error) {
        return { pass: false, errMsg: "Invalid URL format" };
    }

    try {
        if (!await isURLalive(url)) {
            return { pass: false, errMsg: "URL is not alive" };
        }
    } catch (e) {
        return { pass: false, errMsg: e };
    }

    return { pass: true, result: url };
}

/** 
    Checks if a passed selector is valid for a given type and serialized DOM.
    @param type - The type of element to be scraped.  singleTypes(text, link, node) or multiTypes(texts, links, nodes)
    @param serializedDom - The serialized DOM
    @param selector - The selector to check
    @returns { pass: true; result: string | string[] } if the selector is valid for the given type and serialized DOM
    @returns { pass: false; errMsg: string } if the selector is invalid for the given type and serialized DOM
*/
export function isSelectorValid<T extends extractTypes,>(type: T, serializedDom: string, selector: string): prevalResult<string | string[]> {
    const extracted = ["text", "link", "node"].includes(type) ? extract(type as singleTypes, serializedDom, selector) : extractAll(type as multiTypes, serializedDom, selector);
    return typeof extracted === "object" && "error" in extracted ? { pass: false, errMsg: extracted.error } : { pass: true, result: extracted as T extends singleTypes ? string : string[] };
}

/** 
    Checks if a passed URL matches a given regular expression.
    @param url - The URL to check
    @param regex - The regular expression to check against
    @returns { pass: true; result: string } if the URL matches the regular expression
    @returns { pass: false; errMsg: string } if the URL does not match the regular expression
*/
export function isRegexValid(url: string, regex: string): prevalResult<string> {
    const r = new RegExp(regex);

    if (z.string().regex(r).safeParse(url).success) {
        const m = url.match(r);
        return m ? { pass: true, result: m[1] } : { pass: false, errMsg: `No match found in ${url}` };
    }
    return { pass: false, errMsg: `${regex} is not a valid regular expression` };
}

/** 
    Checks if a passed URL has a given parameter and parameter+1 is a valid URL.
    @param url - The URL to check
    @param parameter - The parameter to check for
    @returns { pass: true; result: string } if the URL has the given parameter
    @returns { pass: false; errMsg: string } if the URL does not have the given parameter
*/
export async function isURLparamValid(url: string, parameter: string): Promise<prevalResult<string>> {
    try {
        const urlObj = new URL(url);
        const params = urlObj.searchParams;
        if (params.has(parameter)) {
            const pageNum = params.get(parameter);
            params.set(parameter, String(Number(pageNum) + 1));
            const newUrl = `${urlObj.origin}?${params.toString()}`;
            return await isUrlValid(newUrl);
        }
        return { pass: false, errMsg: "No matching URL parameter" };
    } catch (e) {
        return { pass: false, errMsg: e };
    }
}

/** 
    Checks if a passed URL has a page number in the URL and page number incremented by 1 is a valid URL.
    @param pageUrl - The URL to check
    @param regex - The regular expression to check against
    @returns { pass: true; result: string } if the URL has the given parameter and is valid
    @returns { pass: false; errMsg: string } if the URL does not have the given parameter or is invalid
*/
export async function isPageNumInUrl(pageUrl: string, regex: string): Promise<prevalResult<string>> {
    try {
        const re = new RegExp(regex);
        if (z.string().regex(re).safeParse(pageUrl).error) {
            return { pass: false, errMsg: `${regex} is not a valid regular expression` };
        }

        const m = pageUrl.match(re);
        if (m) {
            const NextpageNum = String(Number(m[1]) + 1);
            const newURL = pageUrl.replace(re, NextpageNum);
            return await isUrlValid(newURL);
        }
        return { pass: false, errMsg: "No matching URL parameter" };
    } catch (e) {
        return { pass: false, errMsg: e };
    }
}


export const errorMsg = {
    missing: {
        entryUrl: "entryUrl input required",
        lastUrl: "lastUrl input required",
        indexDOM:
            "Failed to acquire index page DOM.  entryUrl input required",
        dom: (url: string, e: unknown) =>
            `Faild to create DOM from URL ${url}\r\n<br>Error: ${e}`,
    }
};

export async function getDOM(nextUrl: string | string[]) {
    const url = Array.isArray(nextUrl) ? nextUrl[0] : nextUrl;

    try {
        const dom = await getSerializedDOM(url);
        return dom;
    } catch (e) {
        throw new Error(`Faild to create DOM from URL ${url}\r\n<br>Error: ${e}`);
    }
}


export async function generateArticleDOM(session: Express.Request["session"], vresult: result): Promise<result> {

    if (!session.articleUrl) {
        return { pass: false, errMsg: errorMsg.missing.entryUrl };
    }
    if (vresult.pass) {
        let vr: result = vresult;
        try {
            session.articleDOM = await getDOM(session.articleUrl);
        } catch (e) {
            vr = { pass: false, errMsg: e };
        }
        return vr;
    }
    return vresult;
}