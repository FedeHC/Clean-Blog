// --------------------------------------------------------------------------------
// Controller function:
// --------------------------------------------------------------------------------
module.exports = (req, res) => {
  res.status(404);
  res.render('404');
  // console.log(`- ${req.url}`);
};