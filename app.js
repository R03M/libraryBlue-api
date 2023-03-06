import "dotenv/config";
import express from "express";
import morgan from "morgan";
import routes from "./src/routes/index.Routes.js";
const { CORS_URL } = process.env;

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", CORS_URL);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

server.get("/favicon.ico", (req, res) => res.status(204));

export default server;
