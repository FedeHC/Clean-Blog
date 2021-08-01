// --------------------------------------------------------------------------------
// Custom middleware:
// --------------------------------------------------------------------------------
module.exports = (req, res, next) => {
  if(req.session.userId) {
     // If user is logged, redirect to home page:
    return res.redirect("/");
  }
  next();
};
