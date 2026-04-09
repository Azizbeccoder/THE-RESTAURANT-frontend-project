import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Member, MemberDocument } from "../members/member.model";
 
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Member.name) private memberModel: Model<MemberDocument>
  ) {}
 
  async login(email: string, password: string) {
    const member = await this.memberModel.findOne({ mb_email: email }).exec();
    if (!member) throw new UnauthorizedException("Invalid credentials");
 
    const valid = await bcrypt.compare(password, member.mb_password);
    if (!valid) throw new UnauthorizedException("Invalid credentials");
 
    const token = jwt.sign(
      { _id: member._id, mb_type: member.mb_type },
      process.env.JWT_SECRET || "burak_secret",
      { expiresIn: "7d" }
    );
 
    return {
      token,
      member: {
        _id:      member._id,
        mb_nick:  member.mb_nick,
        mb_email: member.mb_email,
        mb_type:  member.mb_type,
      },
    };
  }
 
  verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET || "burak_secret");
  }
}