const express = require("express");
const app = express();
const cors = require("cors");
const {
  homeRoute,
  getRooms,
  getTestimonials,
  getRoomById,
} = require("./controllers/controllers");
const { run } = require("./DB/db");
// const cookieParser = require("cookie-parser");

//npm middlewares
app.use(express.json());
app.use(cors());

//db connection test
run();

//all api routes
app.get("/", homeRoute);
app.get("/api/v1/get-rooms", getRooms);
app.get("/api/v1/get-rooms/:id", getRoomById);
app.get("/api/v1/get-testimonials", getTestimonials);

module.exports = app;
