const BlogPost = require("../models/BlogPost");
const aux = require("../auxiliary");

// --------------------------------------------------------------------------------
// Controller function:
// --------------------------------------------------------------------------------
module.exports = async (req, res) => {
  // Find all posts:
  let getPosts = await BlogPost.find({}).populate("userid");  // Empty object for finding all posts.

  // Shorten body posts to 100 chars:
  getPosts = aux.shortenPost(getPosts);

  // Pass all searched & shortened posts to render:
  res.render("index", { blogposts: getPosts });

  // console.log(`- ${req.url}`);
};
