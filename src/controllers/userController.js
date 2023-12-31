const router = require("express").Router();
const userService = require("../services/userService");

router.get( "/register", async(req, res) => {
    res.render("user/register");
});

router.post( "/register", async(req, res) => {
    const { username, password, repeatPassword } = req.body; 
    await userService.register({ username, password, repeatPassword });
    res.redirect("/users/login");
});

router.get( "/login", async(req, res) => {
    res.render("user/login");
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const token = await userService.login(username, password);

    res.cookie("auth", token, { httpOnly: true });
    res.redirect("/");
});


router.get("/logout", async (req, res) => {
    res.clearCookie("auth");
    res.redirect("/");
});

module.exports = router;