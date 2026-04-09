import {
  Controller, Get, Post, Put,
  Body, Param, Req, UseGuards,
} from "@nestjs/common";
import { MembersService } from "./members.service";
import { AuthGuard } from "../auth/auth.guard";
 
@Controller("members")
export class MembersController {
  constructor(private readonly membersService: MembersService) {}
 
  // Public: register new user
  @Post("signup")
  signup(
    @Body()
    body: {
      mb_nick: string;
      mb_email: string;
      mb_password: string;
      mb_phone?: string;
    }
  ) {
    return this.membersService.signup(body);
  }
 
  // Private: get own profile
  @Get("profile")
  @UseGuards(AuthGuard)
  getProfile(@Req() req: any) {
    return this.membersService.getProfile(req.user._id);
  }
 
  // Private: update own profile
  @Put("profile")
  @UseGuards(AuthGuard)
  updateProfile(@Req() req: any, @Body() body: any) {
    return this.membersService.updateProfile(req.user._id, body);
  }
 
  // Admin only: list all members
  @Get()
  @UseGuards(AuthGuard)
  getAll() {
    return this.membersService.getAll();
  }
}