const BlogPost = require("../models/BlogPost");

// --------------------------------------------------------------------------------
// Controller function:
// --------------------------------------------------------------------------------
module.exports = async (req, res) => {
  const blogPost = await BlogPost.findById(req.params.id).populate("userid");
  res.render("post", { blogpost: blogPost });
  // console.log(`- ${req.url}`);
};
