import { ObjectId } from "mongoose";
import { MemberStatus, MemberType } from "../enums/member.enum";


export interface Member {
    _id: ObjectId;
    membertype: MemberType;
    memberStatus: MemberStatus;
    memberNick: String;
    memberPhone: String;
    memberPassword?: String;
    memberAdress?: String;
    memberDesc?: String;
    memberImage?: String;
    memberPoints: Number;  
    createdAt: Date;
    updatedAt: Date;
}


export interface MemberInput {
    membertype?: MemberType;
    memberStatus?: MemberStatus;
    memberNick: String;
    memberPhone: String;
    memberPassword: String;
    memberAdress?: String;
    memberDesc?: String;
    memberImage?: String;
    memberPoints?: Number;    
}

// src/libs/types/member.ts
export interface LoginInput {
    memberNick: string;  // ✅ change from memberNIck → memberNick
    memberPassword: string;
}
