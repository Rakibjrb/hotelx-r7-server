const express = require("express");
const app = express();
const cors = require("cors");
const { homeRoute, getRooms } = require("./controllers/controllers");
const { run } = require("./DB/db");
// const cookieParser = require("cookie-parser");

//npm middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

//db connection test
run();

//all api routes
app.get("/", homeRoute);
app.get("/api/v1/get-rooms", getRooms);

module.exports = app;
