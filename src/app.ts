import express from "express";
import morgan from "morgan";
import config from "./config";
import authRouter from "./routes/auth";
import cors from "cors";
import taskRouter from "./routes/tasks";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

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

// Docs api
const environment = process.env.ENVIRONMENT;
const extentionFile = !!environment ? "ts" : "js";
app.use(
	"/api/docs",
	swaggerUI.serve,
	swaggerUI.setup(
		swaggerJSDoc({
			definition: {
				openapi: "3.0.0",
				info: {
					title: "MEAN api Application",
					version: "1.0.0",
				},
				servers: [
					{
						url: "http://localhost:5000",
					},
					{
						url: "https://rest-mean-stack.onrender.com",
					},
				],
			},
			apis: [`${path.join(__dirname, "./routes/*.*")}`],
		})
	)
);

export default app;
