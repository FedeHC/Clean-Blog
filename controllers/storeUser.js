const path = require("path");
const User = require("../models/User.js");

// --------------------------------------------------------------------------------
// Controller function:
// --------------------------------------------------------------------------------
module.exports = (req, res) => {
  User.create(req.body, (error, user) => {
    if(error) {
      const validationErrors = Object.keys(error.errors).map( (key) => 
        error.errors[key].message.replace(/`/g, "\"")     // Get messages in error.errors
      );                                                  // and replace all ` for ".
      req.flash("data", req.body);                        // Save req.body data for next request.
      req.flash("validationErrors", validationErrors);    // Flush validationErrors from
      // req.session.validationErrors = validationErrors; // session on next request.
      // console.log(error);
      // console.log(validationErrors);
      return res.redirect("/auth/register");
    }
    res.redirect("/");
  })
}
