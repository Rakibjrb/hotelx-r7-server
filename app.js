const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const {
  homeRoute,
  getFeaturedRooms,
  getTestimonials,
  getRoomById,
  getAvailableRooms,
  userBookingRooms,
  updateRoomById,
  getBookingRooms,
  deleteBookings,
  updateBookingDate,
  handlePostTestimonials,
  setSookieToken,
} = require("./controllers/controllers");
const { run } = require("./DB/db");
const cookieParser = require("cookie-parser");

//npm middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://hotelx-r7.web.app", "https://hotelx-r7.firebaseapp.com"],
    credentials: true,
  })
);

//custom middleware
const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token)
    return res.status(403).send({ message: "forbidden", statusCode: 403 });

  jwt.verify(token, process.env.TOKEN_SECRETE, (err, decoded) => {
    if (err)
      return res.status(401).send({ message: "unauthorized", statusCode: 401 });
    req.user = decoded;
    next();
  });
};

//db connection test
run();

//all api routes
app.get("/", homeRoute);
app.get("/api/v1/get-featured-rooms", getFeaturedRooms);
app.get("/api/v1/get-available-rooms", getAvailableRooms);
app.get("/api/v1/get-available-rooms/:id", getRoomById);
app.get("/api/v1/get-testimonials", getTestimonials);
app.get("/api/v1/get-booking-rooms", verifyToken, getBookingRooms);

//all post routes
app.post("/api/v1/booking", verifyToken, userBookingRooms);
app.post("/api/v1/postTestimonials", verifyToken, handlePostTestimonials);
app.post("/api/v1/create-token", setSookieToken);

//all put or patch routes
app.patch("/api/v1/get-available-rooms/:id", verifyToken, updateRoomById);
app.patch("/api/v1/update-booking-date/:id", verifyToken, updateBookingDate);

//all delete routes
app.delete("/api/v1/delete-bookings/:id", verifyToken, deleteBookings);

module.exports = app;
