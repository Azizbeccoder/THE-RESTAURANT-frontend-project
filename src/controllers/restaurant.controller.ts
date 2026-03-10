import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";

// BUG FIX 8: There were TWO restaurant.controller.ts files — one basic (used as restaurantController
// for members) and one full (for admin). They were conflicting / duplicated.
// The correct controller for restaurant ADMIN is this one (with processLogin + processSignup).
// The member router should use a SEPARATE memberController (see member.controller.ts).

const restaurantController: T = {};

restaurantController.goHome = (req: Request, res: Response) => {
  try {
    console.log("goHome");
    res.send("Home page");
  } catch (err) {
    console.log("Error, goHome:", err);
  }
};

restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    console.log("getLogin");
    res.send("Login page");
  } catch (err) {
    console.log("Error, getLogin:", err);
  }
};

restaurantController.getSignUp = (req: Request, res: Response) => {
  try {
    console.log("getSignUp");
    res.send("Signup page");
  } catch (err) {
    console.log("Error, getSignUp:", err);
  }
};

restaurantController.processLogin = async (req: Request, res: Response) => {
  try {
    console.log("processLogin");
    const input: LoginInput = req.body;
    const memberService = new MemberService();
    const result = await memberService.processLogin(input);
    res.json(result); // BUG FIX 9: Was res.send(result) — use res.json() for objects
  } catch (err) {
    console.log("Error, processLogin:", err);
    // BUG FIX 10: Was res.send(err) — sending raw Error object leaks internals.
    // Send a proper HTTP status code with message instead.
    res.status(400).json({ message: (err as Error).message || "Login failed" });
  }
};

restaurantController.processSignup = async (req: Request, res: Response) => {
  try {
    console.log("processSignup");
    const newMember: MemberInput = req.body;
    newMember.membertype = MemberType.RESTAURANT;
    const memberService = new MemberService();
    const result = await memberService.processSignup(newMember);
    res.json(result); // BUG FIX 9: Was res.send(result) — use res.json() for objects
  } catch (err) {
    console.log("Error, processSignup:", err);
    // BUG FIX 10: Was res.send(err) — sending raw Error object leaks internals.
    res.status(400).json({ message: (err as Error).message || "Signup failed" });
  }
};

export default restaurantController;
