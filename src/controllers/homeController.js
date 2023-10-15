const router = require("express").Router();
const cubesService = require("../services/cubeService");

router.get( "/", async(req, res) => {
    let cubes = await cubesService.getAll();
    const { search, from, to } = req.query;

    if(search)
        cubes = cubes.filter(x => x.name.toLowerCase().includes(search));

    if(from)
        cubes = cubes.filter(x => x.difficultyLevel >= from);

    if(to)
        cubes = cubes.filter(x => x.difficultyLevel <= to);


    res.render("index", { cubes, search, from, to });
});
router.get( "/about", (req, res) => {
    res.render("about");
});
router.get( "/404", (req, res) => {
    res.render("404");
});

module.exports = router;