import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./routerAdmin";
import morgan from "morgan";
import { MORGAN_FORMAT } from "./libs/types/config"; // make sure this exists

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan(`method :url - :response-time [:status] \n`));
app.use(morgan(MORGAN_FORMAT));
app.use(morgan("dev"));

// Views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routers
app.use("/admin", routerAdmin);
app.use("/", router);

// Export default app for server.ts
export default app;

