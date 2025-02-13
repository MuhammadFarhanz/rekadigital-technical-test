import express from "express";
import { errorMiddleware } from "../middleware/error-middleware.js";
import cors from "cors";
import { publicRouter } from "../routes/public.js";

export const app = express();

app.use(express.json());
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(errorMiddleware);
app.use(publicRouter);
