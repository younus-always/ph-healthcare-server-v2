import express, { Application, Request, Response, urlencoded } from "express";
import cors from "cors";

const app: Application = express();



app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());


app.get("/", (req: Request, res: Response) => {
      res.status(200).json({
            success: true,
            statusCode: 200,
            message: "PH Healthcare Server",
            date: Date.now()
      })
});


export default app;