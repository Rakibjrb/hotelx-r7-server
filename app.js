const express = require("express");
const app = express();
const cors = require("cors");
const {
  homeRoute,
  getFeaturedRooms,
  getTestimonials,
  getRoomById,
  getAvailableRooms,
  userBookingRooms,
  updateRoomById,
  getBookingRooms,
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
app.get("/api/v1/get-featured-rooms", getFeaturedRooms);
app.get("/api/v1/get-available-rooms", getAvailableRooms);
app.get("/api/v1/get-available-rooms/:id", getRoomById);
app.get("/api/v1/get-testimonials", getTestimonials);
app.get("/api/v1/get-booking-rooms", getBookingRooms);

//all post routes
app.post("/api/v1/booking", userBookingRooms);

//all put or patch routes
app.patch("/api/v1/get-available-rooms/:id", updateRoomById);

module.exports = app;
