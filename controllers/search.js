const BlogPost = require("../models/BlogPost");
const aux = require("../auxiliary");

// --------------------------------------------------------------------------------
// Controller function:
// --------------------------------------------------------------------------------
module.exports = async (req, res) => {
  const searchTerm = new RegExp(req.body.search.trim(), "gi");
   // Find searched posts:
  let searchPosts = await BlogPost.find({ title: searchTerm });

  // Shorten body posts to 100 chars:
  searchPosts = aux.shortenPost(searchPosts);

  // Pass all searched & shortened posts to render:
  res.render("index", { blogposts: searchPosts });
  
  // console.log(`- ${req.url}`);
};
