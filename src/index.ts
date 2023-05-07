import * as dotenv from "dotenv";
import express, { Express } from "express";
import bodyParser from "body-parser";

dotenv.config();

const createServer = () => {
  const server: Express = express();

  server.use(bodyParser.json());

  return server;
};

const server: Express = createServer();
const port = process.env.PORT;

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
