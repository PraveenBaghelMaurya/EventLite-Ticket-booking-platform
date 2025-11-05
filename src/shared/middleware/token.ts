import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { asyncHandler } from "./responseHandler";
import { ApiResponse } from "../utils/errors/AppError.";
import { NextFunction } from "express";
import { Request, Response } from "express";
import { prisma } from "../../shared/lib/prisma"

export const accessTokenGenerate = (user: any) => {
    try {
        const accessToken = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.ACCESS_TOKEN_SECRET as string, {
            expiresIn: parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN as string)
        })
        return accessToken
    } catch (error) {
        throw error;
    }
}

export const refreshTokenGenerate = (userId: number) => {
    try {
        const refreshToken = jwt.sign({
            id: userId,
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
}

export const verifyAccessToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const token = req.cookies.accessToken || req.headers.authorization?.replace('Bearer ', '')
    if (!token) {
        return ApiResponse.unauthorized(res, 'Unauthorized')
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as { id: number }

    const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            accessToken: true
        }
    });

    if (!user) {
        return ApiResponse.unauthorized(res, 'Unauthorized')
    }

    (req as any).user = user;

    next()
})
