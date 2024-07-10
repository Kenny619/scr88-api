
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