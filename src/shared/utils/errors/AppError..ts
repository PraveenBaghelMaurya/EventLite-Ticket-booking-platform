import { Response } from 'express';

interface SuccessResponse {
  success?: boolean;
  message: string;
  data?: any;
  statusCode?: number;
}

interface ErrorResponse {
  success?: boolean;
  message: string;
  error?: any;
  statusCode?: number;
  code?: string;
  context?: Record<string, any>;
}

export class ApiResponse {
  // Success Response
  static success(res: Response, data: SuccessResponse) {
    return res.status(data.statusCode || 200).json({
      success: true,
      message: data.message,
      data: data.data,
    });
  }

  // Error Response
  static error(res: Response, error: ErrorResponse) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
      error: error.error,
    });
  }

  // Not Found Response
  static notFound(res: Response, message: string = 'Resource not found') {
    return res.status(404).json({
      success: false,
      message,
    });
  }

  // Bad Request Response
  static badRequest(res: Response, message: string, errors?: any) {
    return res.status(400).json({
      success: false,
      message,
      errors,
    });
  }

  // Unauthorized Response
  static unauthorized(res: Response, message: string = 'Unauthorized') {
    return res.status(401).json({
      success: false,
      message,
    });
  }
}
