// src/shared/types/upload.types.ts
export interface ImageUploadResponse {
    success: boolean;
    message: string;
    data?: {
      id: string;
      url: string;
      optimizedUrl: string;
      thumbnailUrl: string;
      size: number;
      type: string;
    };
  }
  
  export interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
  }
  
  export enum ImageFolder {
    AVATARS = '/EventLite/Profile',
    // AVATARS = '/eventlite/avatars',
    EVENT_MAIN = '/eventlite/events/main',
    EVENT_GALLERY = '/eventlite/events/gallery',
    CATEGORY = '/eventlite/categories',
    TICKET = '/eventlite/tickets'
  }