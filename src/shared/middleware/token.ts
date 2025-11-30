import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ApiResponse } from "../utils/errors/AppError.";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared/lib/prisma"
import { UserRole } from "@prisma/client";
import type { JWTPayload, user } from '../types/userType'
import { partial } from "zod/v4/core/util.cjs";


dotenv.config();

  
export const accessTokenGenerate = (user: user) => {
  try {
    const accessToken = jwt.sign({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN as string)
    })
    return accessToken
  } catch (error) {
    throw error;
  }
}


export const refreshTokenGenerate = (user: user) => {
  try {
    const refreshToken = jwt.sign({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }, process.env.REFRESH_TOKEN_SECRET as string, {
      expiresIn: parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN as string)
    })
    return refreshToken
  } catch (error) {
    throw error;
  }
}

export const generateAccessAndRefreshToken = (user: any) => {
  try {
    const accessToken = accessTokenGenerate(user)
    const refreshToken = refreshTokenGenerate(user.id)
    return { accessToken, refreshToken }
  } catch (error) {
    throw error;
  }
  try {
    const accessToken = accessTokenGenerate(user)
    const refreshToken = refreshTokenGenerate(user.id)
    return { accessToken, refreshToken }
  } catch (error) {
    throw error;
  }
}


export const verifyAccessToken = (requiredRole:UserRole[]=[])=>(req: Request, res: Response, next: NextFunction) => {
  try {
    const incomingToken = req.cookies.accessToken || req.body.accessToken;

    if (!incomingToken) {
      return ApiResponse.error(res, { message: "Token not found" });
    }

    const verifyToken = jwt.verify(incomingToken, process.env.ACCESS_TOKEN_SECRET as string) as JWTPayload;
 

    if (!requiredRole.includes(verifyToken.role)) {
      return ApiResponse.error(res, { message: `your ${verifyToken.role} but required ${requiredRole}` });
    }

    if (!verifyToken) {
      return ApiResponse.error(res, { message: "Access Token is Invalid" })
    }

    req.user = verifyToken;

    next();
  } catch (error: any) {
    return ApiResponse.error(res, { message: `access token expire`,
      error
     })
  }

}
