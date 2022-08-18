import express from "express";
import config from "./config";

const app = express();

// Config
app.set("port", config.app.port);

// Middlewares

// Routes

// Static files
app.use("/", express.static(__dirname + "/public"));

export default app;
