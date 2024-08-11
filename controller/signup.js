const Users = require("../models/data");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports.getSignup = (req, res) => {
  res.render("signup", {
    msg: req.flash("msg"),
  });
};

module.exports.postSignup = async (req, res) => {
  const { name, pass } = req.body;
  try {
    let user = await Users.findOne({
      name,
    });
    if (!user) {
      bcrypt.hash(pass, saltRounds).then(async function (hash) {
        user = await Users.create({
          name,
          password: hash,
        });
      });
      req.session.name = name;
      // req.session.password = pass;
      return res.redirect("/login");
    } else {
      req.flash("msg", "Username already exist");
      return res.redirect("/signup");
    }
  } catch (err) {
    req.flash("msg", "Error Occured! try again");
    res.redirect("/signup");
  }
};
