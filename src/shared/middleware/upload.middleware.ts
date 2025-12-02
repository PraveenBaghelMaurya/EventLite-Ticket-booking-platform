import multer, { FileFilterCallback } from 'multer';
import { Request } from 'express';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/gif',
  'image/webp'
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Memory storage for processing
const storage = multer.memoryStorage();

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return cb(new Error(
      `Invalid file type. Allowed types: ${ALLOWED_MIME_TYPES.join(', ')}`
    ));
  }
  cb(null, true);
};

// Create upload middleware
export const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1
  },
  fileFilter
});

// Pre-configured uploaders
export const uploadAvatar = upload.single('avatar');
export const uploadEventImage = upload.single('image');
export const uploadMultipleImages = upload.array('images', 10);