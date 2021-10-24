// express 불러오기
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: "./config.env" });

app.use(express.json({ extended: false }));
app.use("/api/register", require("./routes/api/register"));

// get요청시 "API Running" 을 response 해주기
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
