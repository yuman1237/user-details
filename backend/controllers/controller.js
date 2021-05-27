const User = require("../models/user");
const moment = require("moment");

exports.renderLoginPage = (req, res) => {
  res.render("index");
};

exports.renderHomePage = (req, res) => {
  if (req.session.loggedin === true) {
    res.render("home");
  }
};

exports.getUsers = async (req, res) => {
  await User.find({})
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.createUser = async (req, res) => {
  try {
    let user_id = (
      Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
    ).toUpperCase();
    let firstname = req.body.firstname.toLowerCase();
    let lastname = req.body.lastname.toLowerCase();

    await new User({
      user_id: user_id,
      firstname: firstname,
      lastname: lastname,
      email: req.body.email,
      gender: req.body.gender,
      dob: req.body.dob,
      pnumber: req.body.pnumber,
    }).save();
    res.redirect("/home");
  } catch (error) {
    res.send(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id })
      .then((d) => {
        res.send(d);
      })
      .catch((err) => {
        res.send(err);
      });
  } catch (err) {}
};

exports.renderUserPage = (req, res) => {
  if (req.session.loggedin === true) {
    User.findOne({ _id: req.query.id }).then((user) => {
      res.render("edituser", {
        user: user,
        msg: req.flash("msg"),
      });
    });
  }
};

exports.editUser = (req, res) => {
  const data = req.body.data;

  User.findOneAndUpdate(
    { _id: data.id },
    {
      $set: {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        gender: data.gender,
        dob: moment(data.dob),
        pnumber: parseInt(data.pnumber),
      },
    }
  )
    .then((u) => {
      req.flash("msg", "Sucessfully Updated");
      res.send(u);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.postLogin = (req, res) => {
  if (req.body.email === "admin@gmail.com" && req.body.password === "12345") {
    req.session.loggedin = true;
    res.redirect("/home");
  }
};
