import express from "express";
import cors from "cors";
import session from "express-session";

//---------routes
import register from "./routes/register.routes.js";
import validator from "./routes/validator.routes.js";

const app = express();
app.use(express.json());
//app.use(cookieParser());
//app.set("trust proxy", 1);
app.use(
	session({
		name: "scr88-register",
		secret: "scr88register",
		resave: true,
		saveUninitialized: true,
		cookie: {
			path: "/register",
			httpOnly: true,
			domain: "localhost",
			secure: false,
			sameSite: "strict",
			maxAge: 1000 * 60 * 60 * 2,
		},
	}),
);

app.use(
	cors({
		credentials: true,
		origin: "http://localhost:3001", //specify origin URL.  do not set it to true.
	}),
);

//routing
app.use("/validator", validator);
app.use("/register", register);
//app.use("/review", review);
//app.use("/generate", generate);

app.listen(3001, () => console.log("Register API server running on port 3001"));
