import express, { Application} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { limiter } from './src/shared/utils/helpers/limiter';
import { testConnection } from './src/shared/utils/prisma/dbTesting';
import { swaggerDocs } from './src/shared/config/swagger';
import userRouter from './src/modules/user/user.route';
import eventRouter from './src/modules/event/event.route';
import cookieParser from 'cookie-parser';
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Load environment variables
dotenv.config();
// testConnection()
swaggerDocs(app);


// Middleware
app.use(cors({
    origin: process.env.FRONTEND as string, // Frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(helmet());// We use Helmet in Node.js to secure Express apps by setting various HTTP headers that protect against common web vulnerabilities like XSS, clickjacking, etc.
app.use(limiter);//limit the number of requests
app.use(morgan('tiny'));// show API request in console
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

//routes

//user
app.use("/api/user", userRouter);

//event
app.use("/api/event", eventRouter);


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📘 Swagger Docs available at: http://localhost:${PORT}/api-docs`);
});