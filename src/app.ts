import express from "express";
import morgan from "morgan";
import config from "./config";
import authRouter from "./routes/auth";
import cors from "cors";
import taskRouter from "./routes/tasks";

const app = express();

// Config
app.set("port", config.app.port);

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRouter);
app.use("/task", taskRouter);

// Static files
app.use("/", express.static(__dirname + "/public"));

export default app;
