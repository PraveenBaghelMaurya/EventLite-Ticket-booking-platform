import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { asyncHandler } from "./responseHandler";
import { ApiResponse } from "../utils/errors/AppError.";
import { NextFunction } from "express";
import { Request, Response } from "express";
import { prisma } from "../../shared/lib/prisma"

dotenv.config();

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

// create if access token is expired using refresh token
export const refreshAccessToken = async (refreshToken: string, res: Response, next: NextFunction) => {
    try {
        const refreshTokenDecoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as { id: number }
        
        const user = await prisma.user.findUnique({
            where: { 
                id: refreshTokenDecoded.id
            }
        });

        if (!user) {
            throw new Error('User not found');
        }

        const newAccessToken = accessTokenGenerate(user);
        
        await prisma.user.update({
            where: { id: user.id },
            data: { 
                accessToken: newAccessToken 
            }
        });
        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN as string)
        });
        next();
       

    } catch (error: any) {
        if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
            try {
                const decoded = jwt.decode(refreshToken) as { id: number };
                if (decoded?.id) {
                    await prisma.user.update({
                        where: { id: decoded.id },
                        data: { 
                            accessToken: null,
                            refreshToken: null 
                        }
                    });
                }
            } catch (cleanupError) {
                console.log(cleanupError);
            }
        }
        return ApiResponse.error(res, { message: error.message });
    }
};