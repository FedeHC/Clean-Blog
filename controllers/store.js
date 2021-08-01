const path = require("path");
const BlogPost = require("../models/BlogPost");
const constants = require("../constants");

// --------------------------------------------------------------------------------
// Controller function:
// --------------------------------------------------------------------------------
module.exports = async (req, res) => {
  // Get image from request object (using express-fileupload middleware):
  let image = req.files.image;
  
  // Save image to folder:
  image.mv(path.resolve(constants.FULL_PATH_IMAGE_FOLDER, image.name),
    async (error) => {
      await BlogPost.create({
        ...req.body,                                            // Add blog content.
        image: `/${constants.IMAGE_FOLDER}/${image.name}`,      // Add image path.
        userid: req.session.userId
      });
      res.redirect("/");
    });
    
  // console.log(`- ${req.url}`);
}
