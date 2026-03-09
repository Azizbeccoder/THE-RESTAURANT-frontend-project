// 🚀 Import core modules & libraries
import express from "express";
import path from "path";
import morgan from "morgan";

// 🗂 Import routers
import router from "./router";
import routerAdmin from "./routerAdmin";

// ⚙️ Import custom config
import { MORGAN_FORMAT } from "./libs/types/config";

// 🏗 Create Express app instance
const app = express();

// ================= Middleware ================== //

// 🌐 Serve static assets
app.use(express.static(path.join(__dirname, "public")));

// 📝 Parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🕵️ HTTP request logging
app.use(morgan(MORGAN_FORMAT));

// ================= Views Setup ================== //

// 🖼 Set views directory
app.set("views", path.join(__dirname, "views"));

// ✨ Set EJS as template engine
app.set("view engine", "ejs");

// ================= Routers ================== //

// 🔑 Admin routes
app.use("/admin", routerAdmin);

// 🌍 Main routes
app.use("/", router);

// ================= Export ================== //

export default app;