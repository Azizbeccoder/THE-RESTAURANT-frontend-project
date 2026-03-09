// ============================================================
// libs/utils/jwt.utils.ts
// JWT Utility Functions
// ============================================================

import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Member } from "../types/member";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../types/config";

// ============================================================
// Token Payload
// ============================================================

export interface TokenPayload {
  _id: string;
  memberNick: string;
  memberType: string;
  memberStatus: string;
  iat?: number;
  exp?: number;
}

// ============================================================
// Create Access Token
// ============================================================

export const createAccessToken = (member: Member): string => {
  const payload: TokenPayload = {
    _id: member._id.toString(),
    memberNick: member.memberNick,
    memberType: member.memberType,
    memberStatus: member.memberStatus,
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

// ============================================================
// Verify Token
// ============================================================

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
};

// ============================================================
// Set Token Cookie
// ============================================================

export const setTokenCookie = (res: Response, token: string): void => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

// ============================================================
// Clear Token Cookie (Logout)
// ============================================================

export const clearTokenCookie = (res: Response): void => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

// ============================================================
// Extract Token From Request
// Supports:
// 1. Cookie (SSR / EJS)
// 2. Authorization Header (SPA / API)
// ============================================================

export const extractToken = (req: Request): string | null => {
  // 1️⃣ Check cookies
  if (req.cookies?.token) {
    return req.cookies.token;
  }

  // 2️⃣ Check Authorization header
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }

  return null;
};