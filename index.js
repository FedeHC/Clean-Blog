const express = require("express");
const mongoose = require("mongoose");

// Middleware libraries:
const ejs = require("ejs");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const flash = require("connect-flash");

// --------------------------------------------------------------------------------
// Custom
// -------------------------------------------------------------------------------
const constants = require("./constants");

// Middleware:
const validateMiddleWare = require("./middleware/validate");
const authUserMiddleWare = require("./middleware/authUser");
const redirectIfAuthMiddleware = require("./middleware/redirectIfAuth");
const loggedMiddleWare = require("./middleware/logged");

// --------------------------------------------------------------------------------
// DB Connection:
// --------------------------------------------------------------------------------
let conn;
(async function connectDB() {
  try {
    conn = await mongoose.connect("mongodb://localhost/my_database",     // MongoDB Connection.
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      })
  }
  catch (error) {
    console.log(error);
  }
})();

// --------------------------------------------------------------------------------
// Express:
// --------------------------------------------------------------------------------
const app = new express();

app.set("trust proxy", 1);                        // Needed for express-session middleware.
app.set("view engine", "ejs");                    // EJS template engine.

app.use(express.static("public"));                // Set "public" folder for static assets.
app.use(express.urlencoded({ extended: true }));  // Express built-in advanced parser.
app.use(express.json());                          // Parse the incoming requests with JSON payloads.
app.use(fileUpload());                            // Using express-fileupload middleware.
app.use(expressSession(                           // Using express-session with secret property.
  {
    secret: "Sarasa & Sarlanga",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,                             // Needed for field below.
      secure: false,                              // If false, sends the cookie to client.
      maxAge: 3600000                             // 1 hour of session (in ms).
    }
  }));
app.use(flash());                                 // Using connect-flash for flushing data session.

// Using custom middleware:
app.use("/posts/store", validateMiddleWare);      // Check if req has title, body and file content.
global.loggedIn = null;                           // Global variable for middleware below.
app.use("*", loggedMiddleWare);                   // For all requests use this middleware for logged user.

// --------------------------------------------------------------------------------
// Start server:
// --------------------------------------------------------------------------------
app.listen(constants.PORT, () => {
  console.log(`# App listening on port ${constants.PORT}.\n`);
});

// --------------------------------------------------------------------------------
// Routes:
// --------------------------------------------------------------------------------

// GET:
app.get("/",                require("./controllers/index"));

app.get("/about",           require("./controllers/about"));

app.get("/contact",         require("./controllers/contact"));

app.get("/posts/new",       authUserMiddleWare,
                            require("./controllers/create"));
                            
app.get("/post/:id",        require("./controllers/id"));

app.get("/auth/register",   redirectIfAuthMiddleware,
                            require("./controllers/newUser"));

app.get("/auth/login",      redirectIfAuthMiddleware,
                            require("./controllers/login"));

app.get("/auth/logout",     require("./controllers/logout"));

// POST:
app.post("/search",         require("./controllers/search"));

app.post("/posts/store",    authUserMiddleWare,
                            require("./controllers/store"));

app.post("/users/register", redirectIfAuthMiddleware,
                            require("./controllers/storeUser"))

app.post("/users/login",    redirectIfAuthMiddleware,
                            require("./controllers/loginUser"));

// Default response (for 404):
app.use(                    require("./controllers/notFound"));
