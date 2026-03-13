
import express from "express";
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import router from "./router";
import routerAdmin from "./routerAdmin";
import { MORGAN_FORMAT } from "./libs/types/config";

const app = express();

// ================= Middleware ================= //

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan(MORGAN_FORMAT));

// ================= Static Files ================= //

app.use(express.static(path.join(__dirname, "public")));

// ================= Views Setup ================= //

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// ================= Routers ================= //

app.use("/admin", routerAdmin);
app.use("/", router);

// ================= Export ================= //

export default app;