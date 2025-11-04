// ✅ Corrected swagger.ts
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EventLite API Docs",
      version: "1.0.0",
      description: "API documentation for the EventLite backend",
    },
    servers: [
      {
        url: "http://localhost:8880",
        description: "Local server",
      },
    ],
  },
  apis: ["./src/modules/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📘 Swagger Docs available at: http://localhost:8880/api-docs");
};
