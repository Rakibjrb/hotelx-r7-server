const {
  roomsCollection,
  testimonialsCollection,
  ObjectId,
  bookingRoomsCollection,
} = require("../DB/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const homeRoute = (req, res) => {
  res.send({
    statusCode: 200,
    message: "server is running fine .....",
  });
};

const getFeaturedRooms = async (req, res) => {
  try {
    const result = await roomsCollection
      .find({ featured: { $eq: true } })
      .toArray();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

const getAvailableRooms = async (req, res) => {
  const value = req.query;

  if (value.price === "2") {
    try {
      const result = await roomsCollection
        .find({ availability: { $eq: "Available" } })
        .toArray();
    } catch (error) {
      res.send(error);
    }
  } else {
    try {
      const result = await roomsCollection
        .find({ availability: { $eq: "Available" } })
        .toArray();
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  }
};

const getRoomById = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };

  try {
    const result = await roomsCollection.find(query).toArray();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

const getBookingRooms = async (req, res) => {
  const query = req.query;
  try {
    const result = await bookingRoomsCollection
      .find({ user: query.email })
      .toArray();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

const updateRoomById = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const updatedInfo = req.body;
  const newInfo = {
    $set: {
      availability: updatedInfo.availability,
    },
  };
  try {
    const result = await roomsCollection.updateOne(query, newInfo);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

const updateBookingDate = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const updateDate = req.body;
  const doc = {
    $set: { bookingDate: updateDate.updatedDate },
  };
  try {
    const result = await bookingRoomsCollection.updateOne(query, doc);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

const getTestimonials = async (req, res) => {
  const options = {};
  try {
    const result = await testimonialsCollection.find(options).toArray();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

const userBookingRooms = async (req, res) => {
  const doc = req.body;
  try {
    const result = await bookingRoomsCollection.insertOne(doc);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

const deleteBookings = async (req, res) => {
  const deleteId = req.params.id;
  const query = { _id: new ObjectId(deleteId) };
  try {
    const deleteBooking = await bookingRoomsCollection.findOne(query);
    const doc = {
      $set: {
        availability: "Available",
      },
    };
    const room = await roomsCollection.updateOne(
      {
        _id: new ObjectId(deleteBooking.roomId),
      },
      doc
    );

    const deleted = await bookingRoomsCollection.deleteOne(query);

    res.send({ updated: deleted });
  } catch (error) {
    res.send(error);
  }
};

const handlePostTestimonials = async (req, res) => {
  const info = req.body;
  try {
    const result = await testimonialsCollection.insertOne(info);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
};

const setSookieToken = (req, res) => {
  const info = req.body;
  const token = jwt.sign(info, process.env.TOKEN_SECRETE, { expiresIn: "1h" });
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .send({ success: true });
};

module.exports = {
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
};
