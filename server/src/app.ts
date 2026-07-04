import express from "express";
import cors from "cors";
import morgan from "morgan";
import { CORS_ORIGIN, NODE_ENV } from "./config/env";
import routes from "./routes/index.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true,
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

if (NODE_ENV === "development") app.use(morgan("dev"));

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);
app.use("/api", routes);

export default app;