
type singleTypes = "text" | "link" | "node";
type multiTypes = "texts" | "links" | "nodes";
type extractTypes = singleTypes | multiTypes;
type prevalResult<T extends string | string[]> = { pass: true; result: T } | { pass: false; errMsg: unknown };
