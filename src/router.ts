import express from "express";
// BUG FIX 11: Was importing restaurantController for member routes — wrong controller!
// Member routes should use memberController (USER type), not restaurant (ADMIN) controller.
import memberController from "./controllers/members.controller";

const router = express.Router();
router.get("/", memberController.goHome);

router
  .route("/login")
  .get(memberController.getLogin)
  .post(memberController.processLogin); // BUG FIX 12: POST /login was missing entirely in original router

router
  .route("/signup")
  .get(memberController.getSignUp)
  .post(memberController.processSignup); // BUG FIX 12: POST /signup was missing entirely in original router

export default router;