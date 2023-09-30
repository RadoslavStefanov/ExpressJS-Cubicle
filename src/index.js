const express = require("express");
const handlebars = require("express-handlebars");
const handlebarsConfig = require("./config/handlebarsConfig");
const expressConfig = require("./config/expressConfig");

const app = express();
const PORT = 5050;


expressConfig(app, express);
handlebarsConfig(app, handlebars);


app.get("/", (req, res) => {
    res.render("index");
});

app.listen(PORT, () => {console.log(`Server is working on port ${PORT}!`)});