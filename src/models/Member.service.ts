import MemberModel from "../Schema/member.model";
import { LoginInput, Member, MemberInput } from "../libs/types/member";
import Errors, { Httpcode, Message } from "../libs/types/errors";
import bcrypt from "bcrypt";

class MemberService {
  private readonly memberModel: typeof MemberModel;

  constructor() {
    this.memberModel = MemberModel;
  }

  public async processSignup(input: MemberInput): Promise<Member> {
    try {
      // check if nickname already exists
      const exist = await this.memberModel
        .findOne({ memberNick: input.memberNick })
        .exec();

      if (exist) {
        throw new Errors(Httpcode.BAD_REQUEST, Message.CREATE_FAILED);
      }

      // hash password
      const salt = await bcrypt.genSalt(10);
      input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

      const result = await this.memberModel.create(input);

      if (!result) {
        throw new Errors(Httpcode.BAD_REQUEST, Message.CREATE_FAILED);
      }

      const member = result.toObject() as Member;

      // hide password before returning
      delete member.memberPassword;

      return member;
    } catch (err) {
      throw new Errors(Httpcode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async processLogin(input: LoginInput): Promise<Member> {
    const member = await this.memberModel
      .findOne(
        { memberNick: input.memberNick },
        { memberNick: 1, memberPassword: 1 }
      )
      .exec();

    if (!member) {
      throw new Errors(Httpcode.NOT_FOUND, Message.NO_MEMBER_NICK);
    }

    if (!member.memberPassword) {
      throw new Errors(Httpcode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }

    const isMatch: boolean = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword
    );

    if (!isMatch) {
      throw new Errors(Httpcode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }

    const result = await this.memberModel.findById(member._id).exec();

    if (!result) {
      throw new Errors(Httpcode.NOT_FOUND, Message.NO_MEMBER_NICK);
    }

    const loginMember = result.toObject() as Member;

    // hide password
    delete loginMember.memberPassword;

    return loginMember;
  }
}

export default MemberService;