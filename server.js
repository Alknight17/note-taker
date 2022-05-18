const express = require("express");
const fs = require("fs");
const path = require("path");

// initialize express
const app = express();
const PORT = process.env.PORT || 3000;

// parse app data using middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));



require('./routes/routes')(app);


app.listen(PORT, function() {
    console.log("App listening on PORT:" + PORT);
});