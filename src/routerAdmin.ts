import express from "express";
const routerAdmin = express.Router();
import restaurantController from "./controllers/restaurant.controller";

routerAdmin.get("/", restaurantController.goHome);

routerAdmin
  .get("/login", restaurantController.getLogin)
  .post("/login", restaurantController.processLogin);

routerAdmin.get("/signup", restaurantController.getSignup);

// POST /signup → process signup form
routerAdmin.post("/signup", restaurantController.processSignup); 

export default routerAdmin;