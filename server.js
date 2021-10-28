// express 불러오기
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./routes/register");
const cors = require("cors");

const app = express();

app.use(cors());

dotenv.config({ path: "./config.env" });
app.use(express.json({ extended: false }));

app.use("/", router);

app.get("/", (req, res) => {
  res.send("API Running");
});

mongoose.connect(process.env.MONGO, () => {
  console.log("DB 연결중...");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
