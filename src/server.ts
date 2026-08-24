import { Server } from "http";
import app from "./app";
import { envVars } from "./config/env";

let server: Server;

const startServer = async () => {
      try {

            server = app.listen(envVars.PORT, () => {
                  console.log(`Server is running on http://localhost:${envVars.PORT}`);
            });
      } catch (err) {
            console.log("Failed to start server:", err);
      }
};

startServer();