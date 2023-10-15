const router = require("express").Router();
const cubeSevice = require("../services/cubeService");
const accessoryService = require("../services/accessoryService");

router.get( "/create", (req, res) => {
    res.render("cube/create");
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

    res.render("cube/details", selectedCube);
});


router.get("/:cubeId/attach-accessory", async (req,res) =>{
    const { cubeId } = req.params;

    const selectedCube = await cubeSevice.getCube(cubeId).lean();
    const accessories = await accessoryService.getAll();
    const hasAccessories = accessories.length > 0;

    res.render("accessory/attach", { selectedCube, accessories,  hasAccessories});
});


module.exports = router;