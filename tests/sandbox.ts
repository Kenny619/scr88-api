import { z } from "zod";

const url = "https://www.google.com";

const regex = new RegExp(/oogle/);
const parsed = z.string().regex(regex).safeParse(url).success;

console.log(parsed);