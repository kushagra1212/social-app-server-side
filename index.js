require("dotenv").config();
const express = require("express");
const cors = require("cors");



const app = express();


const mongoose = require("mongoose");
app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', 'https://eimentum.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

const cookieParser = require("cookie-parser");
const router = require("./routers/auth");
const upload = require("./routers/upload/upload");
const post = require("./routers/post/post");
const users = require("./routers/users/users");
const item = require("./routers/item/item");
const count = require("./routers/count/count");
const StoriesRouter = require("./routers/Stories/StoriesRouter");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const image = require("./Model/imageModel");
const PORT = 4000;
const dbURL = `mongodb+srv://${process.env.DBUSER}:${process.env.PASS}@cluster0.vmjpo.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;


app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/auth", router);

app.use("/upload", upload);
app.use("/post", post);
app.use("/users", users);
app.use("/item", item);
app.use("/count", count);
app.use("/stories", StoriesRouter);
app.get("/verify", (req, res) => {});
app.use("/", (req, res) => {
  res.send("server");
});
mongoose.connect(
  dbURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log("NOT CONNECTED TO DB");
    else {
      console.log("CONNNETD TO DB");
      app.listen(PORT, () => console.log(`running on port ${PORT}`));
    }
  }
);
