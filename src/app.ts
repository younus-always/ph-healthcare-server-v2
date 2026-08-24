import express, { Application, Request, Response, urlencoded } from "express";
import cors from "cors";
import { IndexRoutes } from "./app/routes";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(urlencoded({ extended: true }));

app.use("/api/v1", IndexRoutes);


app.get("/", (req: Request, res: Response) => {
      res.status(200).json({
            success: true,
            statusCode: 200,
            message: "PH Healthcare Server",
            date: new Date().toLocaleDateString()
      })
});


export default app;