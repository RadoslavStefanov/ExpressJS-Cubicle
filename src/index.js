const express = require("express");
const handlebars = require("express-handlebars");
const handlebarsConfig = require("./config/handlebarsConfig");
const expressConfig = require("./config/expressConfig");
const routes = require("./router");
const dbConnect = require("./config/dbConfig");

const app = express();
const PORT = 5050;

dbConnect()
.then(() => console.log("Database has been connected!"))
.catch(err => console.log(err));

// Configs
expressConfig(app, express);
handlebarsConfig(app, handlebars);

//Routes
app.use(routes)

app.listen(PORT, () => {console.log(`Server is working on port ${PORT}!`)});