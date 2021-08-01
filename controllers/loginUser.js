const bcrypt = require("bcrypt");
const User = require("../models/User.js");

// --------------------------------------------------------------------------------
// Controller function:
// --------------------------------------------------------------------------------
module.exports = (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username }, (error, user) => {
    if(user) {
      bcrypt.compare(password, user.password, (error, same) => {
        if(same) {                      // If password match...
          // console.log(`# User ${username} has logged.`);
          req.session.username = username;
          req.session.userId = user._id;
          res.redirect("/");            // ...store user session.
        }
        else {
          req.flash("data", req.body);
          res.redirect("/auth/login");  // Otherwise send back to login page again.
        }
      })
    }
    else
      res.redirect("/auth/login");      // Send back to login page again if username not found.
  });
}
