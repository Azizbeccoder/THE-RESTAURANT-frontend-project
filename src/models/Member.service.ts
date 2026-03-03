import MemberModel from "../Schema/member.model";                    // 🌟 Import Mongoose model for members
import { LoginInput, Member, MemberInput } from "../libs/types/member"; // 📦 Import TypeScript types
import Errors, { Httpcode, Message } from "../libs/types/errors";     // ⚠️ Custom error handling
import { MemberType } from "../libs/enums/member.enum";              // 📝 Enum for member roles (not used yet)

class MemberService {                                                // 🏗 Service class for member logic
  private readonly memberModel: typeof MemberModel;                  // 🔒 Holds the Mongoose model

  constructor() {                                                    // 🏗 Initialize the model
    this.memberModel = MemberModel;                                   // 🔑 Assign model to property
  }

  public async processSignup(input: MemberInput): Promise<string> {  // 📝 Handle member signup
    const exist = await this.memberModel.findOne({ memberNick: input.memberNick }).exec(); // 🔍 Check if nickname exists
    if (exist) throw new Errors(Httpcode.BAD_REQUEST, Message.CREATE_FAILED); // ❌ Throw error if exists

    try {
      await this.memberModel.create(input);                           // ✅ Create new member
      return "done";                                                  // 🎯 Return success
    } catch (err) {
      throw new Errors(Httpcode.BAD_REQUEST, Message.CREATE_FAILED);   // ⚠️ Catch DB errors
    }
  }

  public async processLogin(input: LoginInput): Promise<Member> {    // 📝 Handle member login
    const member = await this.memberModel.findOne({ memberNick: input.memberNick }).exec(); // 🔍 Find member by nickname

    if (!member) throw new Errors(Httpcode.BAD_REQUEST, Message.CREATE_FAILED); // ❌ Throw if not found

    console.log("member", member);                                    // 🖥 Debug log (optional)
    return member.toObject() as Member;                                // ✅ Convert to plain object and return
  }
}

export default MemberService;                                         // 📤 Export for controllers