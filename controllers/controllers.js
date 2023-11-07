const {
  roomsCollection,
  client,
  testimonialsCollection,
  ObjectId,
  featuredRoomsCollection,
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
    const result = await featuredRoomsCollection.find({}).toArray();
    res.send(result);
  } catch (error) {
    res.send(error);
  } finally {
    await client.close();
  }
};

const getAvailableRooms = async (req, res) => {
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
  try {
    await client.connect();
    const result = await bookingRoomsCollection.find({}).toArray();
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
    const result = await featuredRoomsCollection.updateOne(query, newInfo);
    res.send(result);
  } catch (error) {
    res.send(error);
  } finally {
    await client.close();
  }
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

module.exports = {
  homeRoute,
  getFeaturedRooms,
  getTestimonials,
  getRoomById,
  getAvailableRooms,
  userBookingRooms,
  updateRoomById,
  getBookingRooms,
};
