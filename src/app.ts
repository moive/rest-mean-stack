import express from "express";
import morgan from "morgan";
import config from "./config";
import authRouter from "./routes/auth";

const app = express();

// Config
app.set("port", config.app.port);

// Middlewares
app.use(morgan("dev"));

// Routes
app.use("/auth", authRouter);

// Static files
app.use("/", express.static(__dirname + "/public"));

export default app;
