import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service";
import { LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";

// BUG FIX 8 (continued): The original router.ts used restaurantController for member routes,
// but that controller had no processLogin/processSignup for USER type members.
// This new memberController handles USER type signups/logins.

const memberController: T = {};

memberController.goHome = (req: Request, res: Response) => {
  try {
    res.send("Home page");
  } catch (err) {
    console.log("Error, goHome", err);
  }
};

memberController.getLogin = (req: Request, res: Response) => {
  try {
    res.send("Login page");
  } catch (err) {
    console.log("Error, login", err);
  }
};

memberController.getSignUp = (req: Request, res: Response) => {
  try {
    res.send("Signup page");
  } catch (err) {
    console.log("Error, getSignUp", err);
  }
};

memberController.processLogin = async (req: Request, res: Response) => {
  try {
    const input: LoginInput = req.body;
    const memberService = new MemberService();
    const result = await memberService.processLogin(input);
    res.json(result);
  } catch (err) {
    console.log("Error, processLogin:", err);
    res.status(400).json({ message: (err as Error).message || "Login failed" });
  }
};

memberController.processSignup = async (req: Request, res: Response) => {
  try {
    const newMember: MemberInput = req.body;
    newMember.membertype = MemberType.USER; // USER type for regular members
    const memberService = new MemberService();
    const result = await memberService.processSignup(newMember);
    res.json(result);
  } catch (err) {
    console.log("Error, processSignup:", err);
    res.status(400).json({ message: (err as Error).message || "Signup failed" });
  }
};

export default memberController;