const {
  roomsCollection,
  client,
  testimonialsCollection,
  ObjectId,
  bookingRoomsCollection,
} = require("../DB/db");

const homeRoute = (req, res) => {
  res.send({
    statusCode: 200,
    message: "server is running fine .....",
  });
};

const getFeaturedRooms = async (req, res) => {
  try {
    await client.connect();
    const result = await roomsCollection
      .find({ featured: { $eq: true } })
      .toArray();
    res.send(result);
  } catch (error) {
    res.send(error);
  } finally {
    await client.close();
  }
};

const getAvailableRooms = async (req, res) => {
  const value = req.query;

  if (value.price === "2") {
    try {
      await client.connect();
      const result = await roomsCollection
        .find({ availability: { $eq: "Available" } })
        .toArray();
    } catch (error) {
      res.send(error);
    } finally {
      await client.close();
    }
  } else {
    try {
      await client.connect();
      const result = await roomsCollection
        .find({ availability: { $eq: "Available" } })
        .toArray();
      res.send(result);
    } catch (error) {
      res.send(error);
    } finally {
      await client.close();
    }
  }
};

const getRoomById = async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };

  try {
    await client.connect();
    const result = await roomsCollection.find(query).toArray();
    res.send(result);
  } catch (error) {
    res.send(error);
  } finally {
    await client.close();
  }
};

const getBookingRooms = async (req, res) => {
  const query = req.query;
  try {
    await client.connect();
    const result = await bookingRoomsCollection
      .find({ user: query.email })
      .toArray();
    res.send(result);
  } catch (error) {
    res.send(error);
  } finally {
    await client.close();
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
    await client.connect();
    const result = await roomsCollection.updateOne(query, newInfo);
    res.send(result);
  } catch (error) {
    res.send(error);
  } finally {
    await client.close();
  }
};

const updateBookingDate = async (req, res) => {
  const id = req.params.id;
  // const query = {_id: new ObjectId(id)};
  const updateDate = req.body;
  console.log({
    id,
    updateDate,
  });

  res.send({ success: true });
};

const getTestimonials = async (req, res) => {
  const options = {};
  try {
    await client.connect();
    const result = await testimonialsCollection.find(options).toArray();
    res.send(result);
  } catch (error) {
    res.send(error);
  } finally {
    await client.close();
  }
};

const userBookingRooms = async (req, res) => {
  const doc = req.body;
  try {
    await client.connect();
    const result = await bookingRoomsCollection.insertOne(doc);
    res.send(result);
  } catch (error) {
    res.send(error);
  } finally {
    await client.close();
  }
};

const deleteBookings = async (req, res) => {
  const deleteId = req.params.id;
  const query = { _id: new ObjectId(deleteId) };
  try {
    await client.connect();
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
  } finally {
    await client.close();
  }
};

const handlePostTestimonials = async (req, res) => {
  const info = req.body;
  try {
    await client.connect();
    const result = await testimonialsCollection.insertOne(info);
    res.send(result);
  } catch (error) {
    res.send(error);
  } finally {
    await client.close();
  }
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
};
