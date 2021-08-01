const User = require("../models/User");

// --------------------------------------------------------------------------------
// Custom middleware:
// --------------------------------------------------------------------------------
module.exports = (req, res, next) => {
  // console.log(`- session.userId: ${req.session.userId}`);

  User.findById(req.session.userId, (error, user) => {
    if(error || !user) {
      // console.log(`- ¿Error? : ${error}`);
      // console.log(`- ¿Hay user? : ${user}`);
      return res.redirect("/");
    }
    next();
  })
};
