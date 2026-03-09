import { Request, Response } from "express";
import { T } from "../libs/types/common";

// Restaurant Controller

const restaurantController: T = {};

restaurantController.goHome = (req: Request, res: Response) => {
  try {
    res.send("Home page");
  } catch (err) {
    console.log("Error, goHome", err);
  }
};

restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    res.send("Login page");
  } catch (err) {
    console.log("Error, login", err);
  }
};

restaurantController.getSignUp = (req: Request, res: Response) => {
  try {
    res.send("Signup page");
  } catch (err) {
    console.log("Error, getSignUp", err);
  }
};

export default restaurantController;