import { UserRole } from '@prisma/client';

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    // Add other user properties you need
  };
}

export interface GoogleUser {
  email: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  [key: string]: any; // For any additional fields that might be present
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role: UserRole;
      };
    }
  }
}

export {};

export enum UserRoleNumber {
  ADMIN = 1,
  ORGANIZER = 2,
  USER = 3,
}

export interface JWTPayload {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface user {
  id: number;
  name: string | null;
  email: string | null;
  role: UserRole;
  refreshToken: string | null;
  accessToken: string | null;
}
