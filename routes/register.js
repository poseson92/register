const express = require("express");
const User = require("../models/User"); // User model 불러오기
const router = express.Router(); // express의 Router 사용
const bcrypt = require("bcrypt"); // 암호화 모듈

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send("이미 사용중인 이메일입니다");
    }
    user = new User({
      name,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.send("성공");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("서버 에러");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("이메일 불일치");
  }
  try {
    if (await bcrypt.compare(password, user.password)) {
      res.send("로그인 성공");
    } else {
      res.send("비밀번호 불일치");
    }
  } catch {
    res.status(500).send("서버 에러");
  }
});

module.exports = router;
