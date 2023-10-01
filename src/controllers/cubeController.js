const router = require("express").Router();
const cubeSevice = require("../services/cubeService");

router.get( "/create", (req, res) => {
    console.log(cubeSevice.getAll());
    res.render("create");
});


router.post( "/create", (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;
    cubeSevice.create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel)
    });

    res.redirect("/");
});

module.exports = router;