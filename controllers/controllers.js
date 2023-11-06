const {
  roomsCollection,
  client,
  testimonialsCollection,
  ObjectId,
} = require("../DB/db");

const homeRoute = (req, res) => {
  res.send({
    statusCode: 200,
    message: "server is running fine .....",
  });
};

const getRooms = async (req, res) => {
  try {
    await client.connect();
    const result = await roomsCollection.find({}).toArray();
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

module.exports = {
  homeRoute,
  getRooms,
  getTestimonials,
  getRoomById,
};
