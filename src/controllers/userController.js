const router = require("express").Router();

router.get( "/register", async(req, res) => {
    res.render("user/register");
});

module.exports = router;