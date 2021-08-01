// --------------------------------------------------------------------------------
// Controller function:
// --------------------------------------------------------------------------------
module.exports = (req, res) => {
  // If exists a userId in session, render page:
  if(req.session.userId) {
    return res.render("create");
    // console.log(`- ${req.url}`);
  }
  
  // Otherwise, redirect to login page:
  res.redirect("/auth/login");
};
