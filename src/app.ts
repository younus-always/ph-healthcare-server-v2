import express, { Application, Request, Response, urlencoded } from "express";
import cors from "cors";
import { IndexRoutes } from "./app/routes";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import status from "http-status";
import { notFound } from "./app/middleware/notFound";
import cookieParser from "cookie-parser";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./app/lib/auth";
import path from "path";
import { envVars } from "./app/config/env";

const app: Application = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), "src/app/templates"));

app.use("/api/auth", toNodeHandler(auth))
app.use(cors({
      origin: [envVars.FRONTEND_URL, envVars.BETTER_AUTH_URL],
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(cookieParser());
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