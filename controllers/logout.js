// --------------------------------------------------------------------------------
// Controller function:
// --------------------------------------------------------------------------------
module.exports = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  })
  // console.log(`- ${req.url}`);
};
