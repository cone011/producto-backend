const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../Models/Users");

exports.signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const email = req.body.email;
  const password = req.body.password;
  const name = "testing";
  try {
    const hashPw = await bcrypt.hash(password, 12);
    const user = new Users({
      email: email,
      name: name,
      password: hashPw,
    });
    const result = await user.save();
    res.status(201).json({ message: "OK", userId: result._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const email = req.body.email;
    const password = req.body.password;
    let userFound;
    const user = await Users.findOne({ email: email });
    if (!user) {
      const error = new Error("The user with this email do not exist!");
      error.statusCode = 401;
      throw error;
    }
    userFound = user;
    const isEqual = bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Invalid password!");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: userFound.email,
        userId: userFound._id.toString(),
      },
      `${process.env.VALID_JWT}`,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      message: "OK",
      result: { token: token, userId: userFound._id.toString() },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUserSeller = async (sellerId) => {
  try {
    const result = await fetch(
      `${process.env.CALL_API_MERCADO}/users/${sellerId}`
    );
    const dataObject = await result.json();
    const breakpoint = /\W|_/g;
    const format = dataObject.nickname.split(breakpoint);
    const lastname = contactLastName(format.slice(1));
    return {
      name: format[0],
      lastname: lastname,
    };
  } catch (err) {
    throw new Error(err);
  }
};

function contactLastName(arr) {
  if (arr.length === 0) return "";
  let currentValue = arr[0];
  return currentValue + " " + contactLastName(arr.slice(1));
}
