require('dotenv').config();
const express = require('express');
const cors = require('cors');
const v1AuthRoutes = require('./routes/v1/auth.routes');
const v1TaskRoutes = require('./routes/v1/task.routes');
const errorMiddleware = require('./middlewares/error.middleware');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Assignment API",
      version: "1.0.0",
      description: "Auth + Tasks",
    },
    servers: [{ url: "http://localhost:4000/api/v1" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/v1/*.js"],
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// routes
app.use('/api/v1/auth', v1AuthRoutes);
app.use('/api/v1/tasks', v1TaskRoutes);

// error handler
app.use(errorMiddleware);

module.exports = app;
