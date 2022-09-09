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
app.use(
	"/api/docs",
	swaggerUI.serve,
	swaggerUI.setup(
		swaggerJSDoc({
			definition: {
				openapi: "3.0.0",
				info: {
					title: "",
					version: "1.0.0",
				},
				servers: [
					{
						url: "http://localhost:5000",
					},
					{
						url: "http://localhost:3000",
					},
				],
			},
			apis: [`${path.join(__dirname, "./routes/*.ts")}`],
		})
	)
);

export default app;
