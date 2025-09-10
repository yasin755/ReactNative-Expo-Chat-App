import express from "express";
import { createServer } from "http";
import ApiError from "./utils/apiError.js";

import apiRoute from "./routes/index.js";
import cookieParser from "cookie-parser";
import setUpSocket from "./socket.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

const httpServer = createServer(app);

const { io } = setUpSocket(httpServer);

app.use("/api", apiRoute);

app.use((req, res, next) => {
  throw new ApiError({
    status: 404,
    message: "URL not found!",
    errors: [
      {
        message: `Cannot ${req.method} ${req.originalUrl} !!!`,
      },
    ],
  });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.status,
    message: err.message,
    errors: err.errors,
  });
});

export { app, io };

export default httpServer;
