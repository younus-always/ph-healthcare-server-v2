import express, { Application, Request, Response, urlencoded } from "express";
import cors from "cors";
import { IndexRoutes } from "./app/routes";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import status from "http-status";
import { notFound } from "./app/middleware/notFound";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(urlencoded({ extended: true }));

app.use("/api/v1", IndexRoutes);


app.get("/", (req: Request, res: Response) => {
      res.status(status.OK).json({
            success: true,
            statusCode: status.OK,
            message: "PH Healthcare Server",
            date: new Date().toLocaleDateString()
      })
});


app.use(globalErrorHandler);
app.use(notFound);

export default app;