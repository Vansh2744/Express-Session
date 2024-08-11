const Users = require("../models/data");
const bcrypt = require("bcrypt");

module.exports.getLogin = (req, res) => {
  res.render("login", {
    msg: req.flash("msg"),
  });
};

module.exports.postLogin = async (req, res) => {
  const { name, pass } = req.body;
  if (req.session.name == name && req.session.password == pass) {
    res.redirect("/page");
  }
  try {
    let user = await Users.findOne({
      name,
    });
    if (!user) {
      req.flash("msg", "incorrect username");
      return res.redirect("/login");
    }
    bcrypt.compare(pass, user.password).then(function (result) {
      if (!result) {
        req.flash("msg", "incorrect password");
        return res.redirect("/login");
      } else {
        req.session.name = name;
        req.session.password = pass;
        return res.redirect("/page");
      }
    });
  } catch (err) {
    console.log(err);
  }
};
