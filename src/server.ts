import { Server } from "http";
import app from "./app";

let server: Server;
const port = 5000;

const startServer = async () => {
      try {

            server = app.listen(port, () => {
                  console.log(`Server is running on http://localhost:${port}`);
            });
      } catch (err) {
            console.log("Failed to start server:", err);
      }
};

startServer();