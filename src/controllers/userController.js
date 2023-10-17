const router = require("express").Router();

router.get( "/register", async(req, res) => {
    res.render("user/register");
});

router.get( "/login", async(req, res) => {
    res.render("user/login");
});

module.exports = router;