// src/shared/utils/upload/upload.service.ts
import { imagekit } from '../../config/imagekit.config';
import { ImageFolder } from '../../types/upload.types';
import { prisma } from '../../lib/prisma';

export class UploadService {
    /* Upload image to ImageKit*/

    async uploadImage(
        fileBuffer: Buffer,
        originalName: string,
        folder: ImageFolder,
        tags: string[] = []
    ): Promise<{
        fileId: string;
        url: string;
        thumbnailUrl: string;
        name: string;
        size: number;
    }> {
        try {
            const fileName = this.generateFileName(originalName);

            const result = await imagekit.upload({
                file: fileBuffer,
                fileName,
                folder,
                useUniqueFileName: true,
                tags: ['eventlite', ...tags],
                responseFields: ['url', 'thumbnailUrl', 'fileId', 'size']
            });

            return {
                fileId: result.fileId,
                url: result.url,
                thumbnailUrl: result.thumbnailUrl || result.url,
                name: result.name,
                size: result.size
            };
        } catch (error: any) {
            throw new Error(`Upload failed: ${error.message}`);
        }
    }

    /* Generate optimized URL for different sizes*/

    generateOptimizedUrl(imageUrl: string, width?: number, height?: number): string {
        const transformation: any = {
            quality: 80,
            format: 'webp'
        };

        if (width) transformation.width = width;
        if (height) transformation.height = height;

        const imagePath = imageUrl.split('/').pop();

        return imagekit.url({
            path: imagePath || '',
            transformation: [transformation]
        });
    }

    /* Save upload record to database*/

    async saveUploadRecord(
        uploadData: {
            filename: string;
            originalName: string;
            mimeType: string;
            size: number;
            url: string;
            imagekitId: string;
            folder: string;
            tags: string[];
        },
        userId: number,
        entityType?: 'USER' | 'EVENT' | 'CATEGORY',
        entityId?: number
    ) {
        // Persist a generic file upload record linked to the user.
        // We store ImageKit's fileId inside the `cloudinaryId` column,
        // which we treat as a generic "cloud file id".
        return prisma.fileUpload.create({
            data: {
                filename: uploadData.filename,
                originalName: uploadData.originalName,
                mimeType: uploadData.mimeType,
                size: uploadData.size,
                url: uploadData.url,
                cloudinaryId: uploadData.imagekitId,
                tags: uploadData.tags,
                uploadedById: userId,
                description:
                    entityType && entityId ? `${entityType}:${entityId}` : 'USER_AVATAR'
            }
        });
    }

    /* Delete image from ImageKit */

    async deleteImage(fileId: string): Promise<void> {
        try {
            await imagekit.deleteFile(fileId);
        } catch (error) {
            console.error('Delete error:', error);
        }
    }

    /* Generate unique filename*/

    private generateFileName(originalName: string): string {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8);
        const extension = originalName.split('.').pop();
        const name = originalName.split('.')[0].replace(/[^a-zA-Z0-9]/g, '_');

        return `${name}_${timestamp}_${random}.${extension}`.toLowerCase();
    }
}

export default new UploadService();