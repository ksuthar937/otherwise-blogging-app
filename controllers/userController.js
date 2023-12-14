const userModel = require("../models/userModel");

const bcrypt = require("bcrypt");

exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send({
        message: "please fill all fields",
        success: false,
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        message: "user already exist",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();
    return res.status(201).send({
      message: "New user created",
      success: false,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "error in register callback",
      success: false,
      error,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      userCount: users.length,
      message: "all users data",
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "error in get All Users ",
      success: false,
      error,
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        message: "please provide email or password",
        success: false,
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(200).send({
        message: "email is not registered",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send({
        message: "Invalid username or password",
        success: false,
      });
    }

    return res.status(200).send({
      message: "User Login Successfully",
      success: false,
      user,
    });
  } catch (error) {
    return res.status(500).send({
      message: "error in login callback",
      success: false,
      error,
    });
  }
};
