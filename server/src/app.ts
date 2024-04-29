import express from "express";
import cors from "cors";

//express instance
const app = express();

//middleware
app.use(cors());

export default app;
