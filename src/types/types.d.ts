
//-------------------------------------------- site
interface site {
    //name of the project
    name: string;

    //FQDN of the source site
    rootUrl: string;

    //Initial URL to start scraping
    entryUrl: string;

    //Language of the source site.  Output file
    language: "JP" | "EN";

    //Source site type.
    siteType: "links" | "multipleArticle" | "singleArticle";

    //How to transition to the next page
    //parameter = creates next page URL by manipulating the page number parameter in the URL
    //url = creates next page URL by manipulating the page number in the URL
    //pagenation = finds the next page link from the pagenation link
    //next = finds the next page link from the next link
    //last = extract the last page number URL from pagenation and creates the list of all page URLs of the site
    nextPageType: "parameter" | "pagenation" | "next" | "url" | "last";

    //If nextPageType = "last" | CSS selector for getting the last page url
    lastUrlSelector?: string;

    //If nextPageType = "last" | RegExp for getting the last page number
    lastPageNumberRegExp?: string;

    //If true, scrape articles that has matching tags to tags parameter
    tagFiltering: boolean;

    //Collect tags from the article
    tagCollect: boolean;

    //CSS selector for the title of the article
    articleTitleSelector: string;

    //CSS selector for the body of the article
    articleBodySelector: string;

    /** optional: Next Page parameters ------------- */

    //if nextPageType === "parameter"
    nextPageParameter?: string;

    //if nextPageType === "next|pagenation" | CSS selector for next page link
    nextPageLinkSelector?: string;

    //if nextPageType === "url" | RegExp for picking the page number from URL
    nextPageUrlRegExp?: string;

    /** optional: Tags ----------------------------- */

    //if tagFiltering is true.  Tags used to filter the articles
    tags: string[];

    //if tagFiltering is true OR tagCollection is true | CSS selector for the tags
    articleTagSelector?: string;

    /** optional: siteType parameters ----------------------------- */

    //CSS selector for capturing link to the article page
    indexLinkSelector?: string;

    //CSS selector for capturing article block on multi-article page
    articleBlockSelector?: string;
}

//-------------------------------------------- articles
interface articles {
    name: string,
    id: string
    url: string,
    title?: string,
    body: string,
    tags?: (string | null)[]
}

interface edArticles {
    name: string,
    id: string,
    url: string,
}



//-------------------------------------------- register
type toggleKey = "tagCollect" | "tagFiltering";
type selectKey = "language" | "siteType" | "nextPageType";
type textKey =
    | "name"
    | "rootUrl"
    | "entryUrl"
    | "last"
    | "next"
    | "parameter"
    | "url"
    | "links"
    | "multiple"
    | "tags"
    | "lastPageNumberRegExp"
    | "articleTagSelector"
    | "articleTitleSelector"
    | "articleBodySelector";
type siteKeys = toggleKey | selectKey | textKey;

type ValueTypes = "value" | "badgeStatus" | "errorMsg";

type textObj = {
    label: string;
    input: {
        method: "text";
        defaultValue: null | string;
    };
    value: string | null;
    badgeStatus: string | null;
    errorMsg: string | null;
    preValidation: string[] | null;
    apiEndPoint: string | null;
    extracted: string | null;
    child?: {
        [key: string]: SubObject;
    };
};

type text = {
    input: {
        method: "text";
    };
};
type textInput = {
    defaultValue: null | string;
};
type textProps = {
    label: string;
    value: string | null;
    badgeStatus: string | null;
    errorMsg: string | null;
    preValidation: string[] | null;
    apiEndPoint: string | null;
    extracted: string | null;
    child?: {
        [key: string]: SubObject;
    };
};
type toggle = {
    input: {
        method: "toggle";
    };
};

type toggleInput = {
    defaultValue: null | boolean;
    choices?: boolean[];
};

type toggleProps = {
    label: string;
    value: boolean | null;
    child?: {
        [key: string]: SubObject;
    };
};

type selectInput = {
    defaultValue: null | string;
    choices?: string[];
};

type selectProps = {
    label: string;
    value: string | null;
    child?: {
        [key: string]: SubObject;
    };
};
type inputTypes = "text" | "toggle" | "select";
type Input<T extends inputTypes> = T extends "text" ? textInput : T extends "toggle" ? toggleInput : T extends "select" ? selectInput : never;
type Property<T extends inputTypes> = T extends "text" ? textProps : T extends "toggle" ? toggleProps : T extends "select" ? selectProps : never;

type select = {
    label: string;
    input: {
        method: "select";
        defaultValue: null | string;
        choices?: string[];
    };
    value: string | null;
    child?: {
        [key: string]: SubObject;
    };
};

interface SubObject {
    label: string;
    input: {
        method: string;
        defaultValue: null | string | boolean;
        choices?: string[] | boolean[];
    };
    value: string | boolean | null;
    badgeStatus?: string | null;
    errorMsg?: string | null;
    preValidation?: string[] | null;
    apiEndPoint?: string | null;
    extracted?: string | null;
    child?: {
        [key: string]: SubObject;
    };
}

interface RegisterObj {
    [key: string]: SubObject;
}

type updateValues = {
    value?: string | boolean;
    badgeStatus?: string;
    errorMsg?: string;
}[];
