require("dotenv").config();
const express = require("express");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const image = require("./Model/imageModel");


const app = express();


const mongoose = require("mongoose");

app.use(cors({
  credentials:true,  cors:true,
  origin:process.env.ORG
}));
const router = require("./routers/auth");
const upload = require("./routers/upload/upload");
const post = require("./routers/post/post");
const users = require("./routers/users/users");
const item = require("./routers/item/item");
const count = require("./routers/count/count");
const StoriesRouter = require("./routers/Stories/StoriesRouter");
const messenger=require('./routers/messenger/mesenger');
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);


const PORT =  process.env.PORT || 4000;
const dbURL = `mongodb+srv://${process.env.DBUSER}:${process.env.PASS}@cluster0.vmjpo.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;


app.use(cookieParser());

app.use(express.urlencoded({ extended: true,origin:process.env.ORG }));

app.use(express.json());
app.set("trust proxy", 1);
app.use("/auth", router);

app.use("/upload", upload);
app.use("/post", post);
app.use("/users", users);
app.use("/item", item);
app.use("/count", count);
app.use("/stories", StoriesRouter);
app.use('/messenger',messenger);
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
