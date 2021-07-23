//required modules and routes
const express = require("express");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

//use express
const app = express();

//Use a port provided by heroku or port 3001
const PORT = process.env.PORT || 3001;

//bodyParser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//middleware to use the static files in the public folder first
app.use(express.static("public"));

//middleware to use routes created in apiRoutes and htmlRoutes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

//Port to listen in on with a console log
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`))