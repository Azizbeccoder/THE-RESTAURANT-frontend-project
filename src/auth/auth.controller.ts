import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
 
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
 
  @Post("login")
  login(@Body() body: { mb_email: string; mb_password: string }) {
    return this.authService.login(body.mb_email, body.mb_password);
  }
}
 