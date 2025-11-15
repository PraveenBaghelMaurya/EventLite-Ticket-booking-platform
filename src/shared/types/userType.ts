interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
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