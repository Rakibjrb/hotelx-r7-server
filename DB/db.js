const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.e9dao1z.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const roomsCollection = client.db("hotelX").collection("rooms");
const testimonialsCollection = client.db("hotelX").collection("testimonials");
const bookingRoomsCollection = client.db("hotelX").collection("bookingRooms");

const run = async () => {
  try {
    client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    //
  }
};

module.exports = {
  run,
  client,
  ObjectId,
  roomsCollection,
  testimonialsCollection,
  bookingRoomsCollection,
};
