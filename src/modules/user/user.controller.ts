import { Request, Response } from 'express';
import { prisma } from '../../shared/lib/prisma';
import { userValidation } from './user.validation';
import { ApiResponse } from '../../shared/utils/errors/AppError.';
import {
  accessTokenGenerate,
  generateAccessAndRefreshToken,
} from '../../shared/middleware/token';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { google } from '../../shared/lib/oauth/google';
import { generateCodeVerifier, generateState } from 'arctic';
import { findOrCreateUser } from './user.service';
import { JWTPayload } from '../../shared/types/userType';
// import type{user} from '../../shared/types/userType'

interface AuthenticatedRequest extends Request {
  user?: any; // Replace 'any' with your actual user type
}

//Authencation
export const signUp = async (req: Request, res: Response) => {
  try {
    const pasredData = userValidation.safeParse(req.body);

    if (!pasredData.success) {
      return ApiResponse.error(res, {
        message: 'Validation Failed',
        error: pasredData.error.flatten().fieldErrors,
      });
    }
    const { name, email, phone, password } = pasredData.data; //role, avatar is pending

    if (!name || !email) {
      return ApiResponse.error(res, { message: 'Name and email is required' });
    }

    if (!password) {
      return ApiResponse.error(res, { message: 'Password is required' });
    }
    const exisitingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { phone: phone }],
      },
    });

    if (exisitingUser) {
      return ApiResponse.error(res, {
        message: 'Email or phone already exists',
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email: email as string,
        phone,
        passwordHash: hashPassword,
      },
    });

    return ApiResponse.success(res, { message: 'User signed up successfully' });
  } catch (error) {
    return ApiResponse.error(res, { message: 'Internal server error' });
  }
};

export const getGoogleLogin = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    // Check if user already logged in
    if (req.user) {
      return res.redirect('/');
    }
    console.log('user getGoogleLogin', req.user);

    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    // Generate authorization URL
    const url = await google.createAuthorizationURL(state, codeVerifier, [
      'openid',
      'profile',
      'email',
    ]);

    // Set cookies for state and code verifier
    res.cookie('google_oauth_state', state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000, // 15 minutes
      sameSite: 'lax',
      path: '/',
    });

    res.cookie('google_code_verifier', codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000,
      sameSite: 'lax',
      path: '/',
    });

    // For API calls - return JSON, for browsers - redirect
    const acceptsJson = req.get('Accept')?.includes('application/json');

    if (acceptsJson) {
      return res.json({
        success: true,
        redirectUrl: url.toString(),
        message: 'Redirect to Google OAuth',
      });
    }

    return res.redirect(url.toString());
  } catch (error) {
    console.error('Google OAuth initiation error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const googleCallback = async (req: Request, res: Response) => {
  try {
    const { code, state } = req.query;
    const storedState = req.cookies?.google_oauth_state;
    const codeVerifier = req.cookies?.google_code_verifier;

    if (!state || state !== storedState) {
      return res.redirect(`${process.env.FRONTEND}?error=invalid_state`);
    }

    if (typeof code !== 'string') {
      return res.redirect(`${process.env.FRONTEND}/login?error=invalid_code`);
    }

    const tokens = await google.validateAuthorizationCode(code, codeVerifier);

    const accessToken = tokens.accessToken();

    const response = await fetch(
      'https://openidconnect.googleapis.com/v1/userinfo',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Google API error: ${response.status} ${response.statusText}`
      );
    }

    const googleUser = await response.json();

    res.clearCookie('google_oauth_state');
    res.clearCookie('google_code_verifier');

    const user = await findOrCreateUser(googleUser, tokens);

    const token = accessTokenGenerate({
      id: user.id,
      name: user.name,
      role: 'USER',
      email: user.email,
      accessToken: null,
      refreshToken: null,
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
      path: '/',
    });

    return res.redirect(`${process.env.FRONTEND}/events?login=success`);
  } catch (error) {
    return res.redirect(`${process.env.FRONTEND}/login?error=auth_failed`);
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const parsedData = userValidation.safeParse(req.body);

    if (!parsedData.success) {
      return ApiResponse.error(res, {
        message: 'Validation Failed',
        error: parsedData.error.flatten().fieldErrors,
      });
    }
    const { email, password } = parsedData.data;

    if (!email || !password) {
      return ApiResponse.error(res, {
        message: 'Email and password is required',
      });
    }

    let user = await prisma.user.findFirst({
      where: {
        email: email as string,
      },
    });

    if (!user) {
      return ApiResponse.error(res, { message: 'Email not found' });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      user.passwordHash as string
    );

    if (!isPasswordMatch) {
      return ApiResponse.error(res, { message: 'Invalid password' });
    }

    const { accessToken, refreshToken } = generateAccessAndRefreshToken(user);
    user = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        accessToken,
        refreshToken,
      },
    });

    const { passwordHash, createdAt, updatedAt, ...rest } = user;

    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true, //development me HTTPS nahi ho to false kar sakte ho
        secure: true, //production me HTTPS ho to true kar sakte ho
        sameSite: 'strict',
      })
      .cookie('accessToken', accessToken, {
        httpOnly: false,
        secure: true,
        sameSite: 'strict',
      });

    return ApiResponse.success(res, {
      message: 'User signed in successfully',
      data: rest,
    });
  } catch (error) {
    return ApiResponse.error(res, { message: 'Internal server error' });
  }
};

export const signOut = async (req: Request, res: Response) => {
  try {
    const token =
      req.cookies.accessToken ||
      req.headers.authorization?.replace('Bearer ', '');
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
    };

    // Always clear cookies regardless of token validity
    res.clearCookie('accessToken', options);
    res.clearCookie('refreshToken', options);

    // If we have a valid token, try to update the user record
    if (token) {
      try {
        const decoded = jwt.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET as string
        ) as { id: number };

        await prisma.user.update({
          where: { id: decoded.id },
          data: {
            accessToken: null,
            refreshToken: null,
          },
        });
      } catch (jwtError) {
        // Token is expired or invalid - that's okay, we're still signing out
        console.log('Token invalid during signout:', (jwtError as any).message);
      }
    }

    return ApiResponse.success(res, {
      message: 'Signed out successfully',
    });
  } catch (error: any) {
    // Final safety net - clear cookies even if everything else fails
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
    };

    res.clearCookie('accessToken', options);
    res.clearCookie('refreshToken', options);

    console.error('Unexpected sign out error:', error);
    return ApiResponse.success(res, {
      message: 'Signed out successfully',
    });
  }
};

//user
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });
    if (!user) {
      return ApiResponse.error(res, { message: 'User not found' });
    }
    return ApiResponse.success(res, {
      message: 'User profile fetched successfully',
      data: user,
    });
  } catch (error) {
    return ApiResponse.error(res, { message: 'Internal server error' });
  }
};

export const filterUser = async (req: Request, res: Response) => {
  try {
    const { searchQuery, page, limit } = req.query;
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    const whereClause: any = {
      role: { not: 'ADMIN' },
    };

    if (searchQuery) {
      whereClause.OR = [
        { name: { contains: searchQuery as string, mode: 'insensitive' } },
        { email: { contains: searchQuery as string, mode: 'insensitive' } },
        { phone: { contains: searchQuery as string, mode: 'insensitive' } },
      ];
    }

    const users = await prisma.user.findMany({
      where: whereClause,
      skip: skip,
      take: limitNum,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });

    const totalUsers = await prisma.user.count({
      where: whereClause,
    });

    return ApiResponse.success(res, {
      message: 'Users fetched successfully',
      data: {
        users,
        pagination: {
          currentPage: pageNum,
          limit: limitNum,
          totalUsers,
          totalPages: Math.ceil(totalUsers / limitNum),
          hasNext: pageNum < Math.ceil(totalUsers / limitNum),
          hasPrev: pageNum > 1,
        },
      },
    });
  } catch (error) {
    console.error('Filter user error:', error);
    return ApiResponse.error(res, { message: 'Internal server error' });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const incomingToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingToken) {
      return ApiResponse.error(res, { message: 'Token not found' });
    }

    const user = jwt.verify(
      incomingToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as JWTPayload;

    const existingUser = await prisma.user.findFirst({
      where: {
        id: user.id,
      },
    });

    if (incomingToken !== existingUser?.refreshToken) {
      return ApiResponse.error(res, { message: 'Token not match' });
    }
    const option = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, refreshToken } =
      await generateAccessAndRefreshToken(user);
    console.log(' refresh token callled');

    return ApiResponse.success(res, {
      message: `accessToken:${accessToken},
             refreshToken:${refreshToken}`,
    })
      .cookie('accessToken', accessToken, option)
      .cookie('refreshToken', refreshToken, option);
  } catch (error: any) {
    return ApiResponse.error(res, { message: error });
  }
};

//with verification user can not update email and phone
