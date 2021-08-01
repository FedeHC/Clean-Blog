const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");


mongoose.connect("mongodb://localhost/my_database",
                 { useNewUrlParser: true, useUnifiedTopology: true });

/*
BlogPost.create(
  {
    title: "The Mythbuster’s Guide to Saving Money on Energy Bills",
    body: "If you have been here a long time, you might remember when I went on ITV Tonight to \
    dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money \
    topics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery \
    opens up. You know those bullet-point lists. You start spotting them everything at this time of year. \
    They go like this: "
  }, (error, blogpost) => {
    console.log(error, blogpost)
  }
);


BlogPost.find({ title: "The Mythbuster’s Guide to Saving Money on Energy Bills" }, (error, blogspot) => {
  console.log(error, blogspot)
});

BlogPost.find({ title: /The/ }, (error, blogspot) => {
  console.log(error, blogspot)
});

*/

BlogPost.findByIdAndUpdate("60ec52c6a416f611e7adbdab", { title: "Updated title for last time" },
  (error, blogspot) => {
    console.log(error, blogspot)
});

/*
BlogPost.findById("60ec52c6a416f611e7adbdab", (error, blogspot) => {
  console.log(error, blogspot)
});

BlogPost.findByIdAndDelete("60ec52c6a416f611e7adbdab", (error, blogspot) =>{
  console.log(error,blogspot)
});
*/
// mongoose.disconnect();