const express = require("express");
const handlebars = require("express-handlebars");
const handlebarsConfig = require("./config/handlebarsConfig");
const expressConfig = require("./config/expressConfig");
const routes = require("./router");

const app = express();
const PORT = 5050;

// Configs
expressConfig(app, express);
handlebarsConfig(app, handlebars);

//Routes
app.use(routes)

app.listen(PORT, () => {console.log(`Server is working on port ${PORT}!`)});