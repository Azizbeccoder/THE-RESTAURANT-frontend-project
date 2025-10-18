import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./routerAdmin";
import morgan from "morgan";


// /* 1-ENTRANCE /
const app = express();

// __dirname exists in CommonJS, works without import.meta
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan(`method :url - :response-time [:status] \n`))

// /* 2-SESSIONS */

// /* 3-VIEWS /
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/admin", routerAdmin);
app.use("/", router);

// /* 4-ROUTERS /
export default app;
