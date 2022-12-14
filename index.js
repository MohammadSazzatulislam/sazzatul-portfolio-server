const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.4lwt8qz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

function run() {
  try {
    const Details = client.db("protFolioDetails").collection("details");

    app.get("/", (req, res) => {
      res.send("hello");
    });

    app.get("/project", async (req, res) => {
      const query = {};
      const result = await Details.find(query).toArray();
      res.send(result);
    });

    app.get("/project/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await Details.findOne(filter);

      res.send(result);
    });

    app.listen(port, () => {
      console.log(`port is running on ${port} `);
    });
  } finally {
  }
}

run();
