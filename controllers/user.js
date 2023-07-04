const User = require("../models/User");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ allUsers: users });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.postUser = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const data = await User.create({
      name: name,
      email: email,
      phone: phone,
    });
    console.log(data);
    res.status(201).json({ newUser: data });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const uId = req.params.userID;
    await User.destroy({ where: { id: uId } });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

