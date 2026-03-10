import express from "express";
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser"; // BUG FIX 13: cookie-parser was in package.json but never imported/used in app.ts
                                          // JWT utils use req.cookies — without this, cookies are always undefined

import router from "./router";
import routerAdmin from "./routerAdmin";
import { MORGAN_FORMAT } from "./libs/types/config";

const app = express();

// ================= Middleware ================== //

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); // BUG FIX 13: Must be registered BEFORE routes so req.cookies is populated
app.use(morgan(MORGAN_FORMAT));

// ================= Views Setup ================== //

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// ================= Routers ================== //

app.use("/admin", routerAdmin);
app.use("/", router);

export default app;