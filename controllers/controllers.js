const { roomsCollection, client } = require("../DB/db");

const homeRoute = (req, res) => {
  res.send({
    statusCode: 200,
    message: "server is running fine .....",
  });
};

const getRooms = async (req, res) => {
  const options = {};

  try {
    await client.connect();
    const result = await roomsCollection.find(options).toArray();
    res.send(result);
  } catch (error) {
    res.send(error);
  } finally {
    await client.close();
  }
};

module.exports = { homeRoute, getRooms };
