// express 불러오기
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { use } = require("./routes/api/register");

const app = express();

app.use(cors());

dotenv.config({ path: "./config.env" });

app.use(express.json({ extended: false }));
app.use("/api/register", require("./routes/api/register"));

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
