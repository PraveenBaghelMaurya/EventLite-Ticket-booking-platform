import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

// Initialize Prisma Client with the database URL from environment variables
const prisma = new PrismaClient({
    // For direct database connection (standard)
    // datasourceUrl: process.env.DATABASE_URL,

    // For Prisma Accelerate (uncomment if using Accelerate)
    // accelerateUrl: process.env.DATABASE_URL,

    // Optional: Enable query logging
    // log: ['query', 'info', 'warn', 'error'],
});

export default prisma;
