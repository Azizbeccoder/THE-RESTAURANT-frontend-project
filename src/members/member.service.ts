import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as jwt from "jsonwebtoken";
import { Member, MemberDocument } from "./member.model";
 
@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Member.name) private memberModel: Model<MemberDocument>
  ) {}
 
  async signup(dto: {
    mb_nick: string;
    mb_email: string;
    mb_password: string;
    mb_phone?: string;
  }) {
    const exists = await this.memberModel.findOne({
      $or: [{ mb_email: dto.mb_email }, { mb_nick: dto.mb_nick }],
    });
    if (exists) throw new BadRequestException("Email or nickname already taken");
 
    const member = new this.memberModel(dto);
    await member.save();
 
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
 
  async getProfile(userId: string) {
    const member = await this.memberModel
      .findById(userId)
      .select("-mb_password")
      .exec();
    if (!member) throw new NotFoundException("Member not found");
    return member;
  }
 
  async updateProfile(userId: string, dto: Partial<Member>) {
    // Never allow password update through this route
    delete (dto as any).mb_password;
    const updated = await this.memberModel
      .findByIdAndUpdate(userId, dto, { new: true })
      .select("-mb_password")
      .exec();
    if (!updated) throw new NotFoundException("Member not found");
    return updated;
  }
 
  async getAll() {
    return this.memberModel.find().select("-mb_password").exec();
  }
}