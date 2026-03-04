// 🚀 Import core modules & libraries
import express from "express";                  // Express: Fast, minimalist web framework
import path from "path";                        // Node.js module for handling file paths
import morgan from "morgan";                    // Morgan: HTTP request logger middleware

// 🗂 Import routers
import router from "./router";                  // Main app routes
import routerAdmin from "./routerAdmin";        // Admin-specific routes

// ⚙️ Import custom config
import { MORGAN_FORMAT } from "./libs/types/config"; // Custom logging format (make sure it exists)

// 🏗 Create Express app instance
const app = express();

// ================= Middleware ================== //

// 🌐 Serve static assets (CSS, JS, images) from 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// 📝 Parse incoming request bodies
app.use(express.urlencoded({ extended: true })); // Forms: extended allows nested objects
app.use(express.json());                          // JSON payloads

// 🕵️ Logging HTTP requests
app.use(morgan(`method :url - :response-time [:status] \n`)); // Quick custom log
app.use(morgan(MORGAN_FORMAT));                                // Config-defined log style
app.use(morgan("dev"));                                        // Dev-friendly colored logs

// ================= Views Setup ================== //

// 🖼 Set directory for EJS templates
app.set("views", path.join(__dirname, "views"));

// ✨ Set the template engine to EJS
app.set("view engine", "ejs");

// ================= Routers ================== //

// 🔑 Admin routes
app.use("/admin", routerAdmin);

// 🌍 Main app routes
app.use("/", router);

// ================= Export ================== //

// 📤 Export the configured Express app for use in server.ts
export default app;