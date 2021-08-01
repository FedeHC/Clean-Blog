const mongoose = require("mongoose");

// --------------------------------------------------------------------------------
// Schema:
// --------------------------------------------------------------------------------
const BlogPostSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    // username: String,
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    datePosted: {
      type: Date,
      default: new Date()
    },
    image: String
 });

// --------------------------------------------------------------------------------
// Model:
// -------------------------------------------------------------------------------- 
const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

module.exports = BlogPost;
