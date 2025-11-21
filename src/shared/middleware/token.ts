import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ApiResponse } from "../utils/errors/AppError.";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../../shared/lib/prisma"
import { UserRole } from "@prisma/client";

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

type RoleGuardInput = keyof typeof UserRole | UserRole;
type RoleGuardParam = RoleGuardInput | RoleGuardInput[];

const normalizeRoles = (roles?: RoleGuardParam) => {
  if (!roles) {
    return null;
  }

  const roleList = Array.isArray(roles) ? roles : [roles];

  return roleList
    .map((role) => UserRole[role as keyof typeof UserRole] ?? role)
    .filter(Boolean) as UserRole[];
};

const attachUserContext = (
  req: Request,
  user: { id: number; email: string | null; role: UserRole }
) => {
  (req as any).user = {
    id: user.id,
    email: user.email,
    role: user.role,
  };
};

const enforceRole = (
  res: Response,
  user: { role: UserRole },
  roles: UserRole[] | null
) => {
  if (roles?.length && !roles.includes(user.role)) {
    ApiResponse.error(res, { message: "Unauthorized access" });
    return false;
  }

  return true;
};

const clearSessionForUser = async (userId: number) => {
  await prisma.user.update({
    where: { id: userId },
    data: {
      accessToken: null,
      refreshToken: null,
    },
  });
};

const clearAuthCookies = (res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
};

const ACCESS_TOKEN_EXPIRY = parseInt(
  process.env.ACCESS_TOKEN_EXPIRES_IN as string
);

const tokenFromRequest = (req: Request) => {
  const bearer = req.headers.authorization?.replace("Bearer ", "");
  return req.cookies?.accessToken ?? bearer;
};

export const refreshAccessToken = (requiredRoles?: RoleGuardParam) => {
  const roles = normalizeRoles(requiredRoles);

  return async (req: Request, res: Response, next: NextFunction) => {
    const handleSessionExpired = async (message: string) => {
      try {
        const refreshToken = req.cookies?.refreshToken;
        if (refreshToken) {
          const decoded = jwt.decode(refreshToken) as { id: number } | null;
          if (decoded?.id) {
            await clearSessionForUser(decoded.id);
          }
        }
      } catch (cleanupError) {
        console.log("Cleanup error:", cleanupError);
      }

      clearAuthCookies(res);
      return ApiResponse.error(res, { message });
    };

    const hydrateUser = async (userId: number) => {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error("User not found");
      }

      if (!enforceRole(res, user, roles)) {
        return null;
      }

      attachUserContext(req, user);
      return user;
    };

    const attemptAccessTokenFlow = async () => {
      const accessToken = tokenFromRequest(req);

      if (!accessToken) {
        return false;
      }

      try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as {
          id: number;
        };

        const user = await hydrateUser(decoded.id);
        if (!user) {
          return true; // response already sent by enforceRole
        }

        if (user.accessToken && user.accessToken !== accessToken) {
          ApiResponse.error(res, { message: "Session mismatch. Please login again." });
          return true;
        }

        next();
        return true;
      } catch (error: any) {
        if (error.name === "TokenExpiredError") {
          return false; // proceed to refresh flow
        }

        ApiResponse.error(res, { message: error.message });
        return true;
      }
    };

    const accessHandled = await attemptAccessTokenFlow();
    if (accessHandled) {
      return;
    }

    // Fallback to refresh token flow
    try {
      const refreshToken = req.cookies?.refreshToken;

      if (!refreshToken) {
        return ApiResponse.error(res, { message: "Refresh token required" });
      }

      const refreshDecoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string
      ) as {
        id: number;
      };

      const user = await hydrateUser(refreshDecoded.id);
      if (!user) {
        return;
      }

      if (!user.refreshToken || user.refreshToken !== refreshToken) {
        return handleSessionExpired("Invalid session. Please login again.");
      }

      const newAccessToken = accessTokenGenerate(user);

      await prisma.user.update({
        where: { id: user.id },
        data: {
          accessToken: newAccessToken,
        },
      });

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: ACCESS_TOKEN_EXPIRY,
      });

      attachUserContext(req, user);

      return next();
    } catch (error: any) {
      if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
        return handleSessionExpired("Session expired. Please login again.");
      }

      return ApiResponse.error(res, { message: error.message });
    }
  };
};

function parseTimeToMs(arg0: string): any {
  throw new Error("Function not implemented.");
}
