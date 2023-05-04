import express from "express";
import * as dotenv from "dotenv";
import { TestController } from "./Controllers/TestController.js";
dotenv.config();
const app = express();
const port = process.env.PORT;
const testController = new TestController();
app.get("/", (req, res) => {
    testController.test(req, res);
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
