import express from "express";
require("dotenv").config();
import cors from "cors";
import initRoutes from "./src/routes";
import { connect } from "./src/config/connectdb";
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["POST", "PUT", "DELETE", "GET"],
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extends: true, limit: "10mb" }));

initRoutes(app);
connect();

const port = process.env.PORT || 8888;
const listener = app.listen(port, () => {
  console.log(`server is running on port ${listener.address().port}`);
});
