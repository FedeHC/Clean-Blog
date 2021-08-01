// --------------------------------------------------------------------------------
// Auxiliary functions:
// --------------------------------------------------------------------------------
const shortenPost = (getPosts) => {
  for (let post = 0; post < getPosts.length; post++) // Loop in each body post...
    getPosts[post].body = getPosts[post].body.substring(0, 100) + "..." // Save only the first 100 chars.
  return getPosts;
};

module.exports = { shortenPost };
