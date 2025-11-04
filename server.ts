import express, { Application} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { limiter } from './src/shared/utils/helpers/limiter';
import { testConnection } from './src/shared/utils/prisma/dbTesting';
import { swaggerDocs } from './src/shared/config/swagger';
import router from './src/modules/user/user.route';
const app: Application = express();
const PORT = process.env.PORT || 5000;

// Load environment variables
dotenv.config();
// testConnection()
swaggerDocs(app);


// Middleware
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

//routes

//user
app.use("/api/user", router);


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📘 Swagger Docs available at: http://localhost:${PORT}/api-docs`);
});