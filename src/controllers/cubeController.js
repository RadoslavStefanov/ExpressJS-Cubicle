const router = require("express").Router();
const cubeSevice = require("../services/cubeService");

router.get( "/create", (req, res) => {
    console.log(cubeSevice.getAll());
    res.render("create");
});


router.post( "/create", async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;
    cubeSevice.create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel)
    });

    res.redirect("/");
});

router.get("/:cubeId/details", async(req, res) => {
    const { cubeId } = req.params;    
    const selectedCube = await cubeSevice.getCube(cubeId).lean();

    if(!selectedCube){
        res.redirect("/404");
        return;
    }

    res.render("details", selectedCube);
});

module.exports = router;