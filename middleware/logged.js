// --------------------------------------------------------------------------------
// Custom middleware:
// --------------------------------------------------------------------------------
module.exports = (req, res, next) => {
  loggedIn = {
    status: req.session.userId,
    username: req.session.username
  };
  next();
};
