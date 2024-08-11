module.exports.getPage = (req, res) => {
  if (req.session.name) {
    res.render("page", {
      name: req.session.name,
    });
  } else {
    res.redirect("/signup");
  }
};
