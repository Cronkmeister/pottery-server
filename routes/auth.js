const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    console.log(savedUser);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong username or password"); //if there is no user

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    );
    //turn password into string
    const orginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    orginalPassword !== req.body.password &&
      res.status(401).json("Wrong password");

    //create json webtoken
    const accessToken = jwt.sign(
      { id: user._id, isAdmim: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    //deconstruct just to remove password when sending JSON object
    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
