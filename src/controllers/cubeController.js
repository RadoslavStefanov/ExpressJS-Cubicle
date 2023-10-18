const router = require("express").Router();
const cubeService = require("../services/cubeService");
const accessoryService = require("../services/accessoryService");
const { difficultyLevelOptions } = require("../utils/difficultyOptions");

router.get( "/create", (req, res) => {
    res.render("cube/create");
});


router.post( "/create", async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;
    cubeService.create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel),
        owner: req.user
    });

    res.redirect("/");
});

router.get("/:cubeId/details", async(req, res) => {
    const { cubeId } = req.params;    
    const selectedCube = await cubeService.getCube(cubeId).lean();

    if(!selectedCube){
        res.redirect("/404");
        return;
    }

    const accessories = selectedCube.accessory;
    const hasAccessories = accessories?.length > 0;

    res.render("cube/details", {selectedCube, hasAccessories});
});


router.get("/:cubeId/attach-accessory", async (req,res) =>{
    const { cubeId } = req.params;

    const selectedCube = await cubeService.getCube(cubeId).lean();
    const accessoriesIds = cube.accessories ? cube.accessories.map((a) => a._id) : [] ;
    const accessories = await accessoryService.getWithoutOwned(accessoriesIds).lean();

    const hasAccessories = accessories === undefined ? false : accessories.length > 0;
    res.render("accessory/attach", { selectedCube, accessories,  hasAccessories});
});

router.post("/:cubeId/attach-accessory", async (req,res) => {
    const { cubeId } = req.params;
    const { accessory: accessoryId} = req.body;
    await cubeService.attachAccessory(cubeId, accessory.accessoryId);

    res.redirect(`/cubes/${cubeId}/details`);
})

router.get("/:cubeId/delete", async (req,res) => {
    const { cubeId } = req.params;
    const cube = await cubeService.getCube(cubeId).lean();
    const options = difficultyLevelOptions(cube.difficultyLevel);

    res.render("cube/delete", { cube, options })
})

router.post("/:cubeId/delete", async (req,res) => {
    const { cubeId } = req.params;
    await cubeService.delete(cubeId);

    res.redirect("/");
})

router.get("/:cubeId/edit", async (req,res) => {
    const { cubeId } = req.params;
    const cube = await cubeService.getCube(cubeId).lean();
    const options = difficultyLevelOptions(cube.difficultyLevel);

    res.render("cube/edit", { cube, options })
})

router.post("/:cubeId/edit", async (req,res) => {
    const { cubeId } = req.params;
    const { name, description, imageUrl, difficultyLevel} = req.body;
    const payLoad = { name, description, imageUrl, difficultyLevel };

    await cubeService.update(payLoad, cubeId);
    
    res.redirect(`/cubes/${cubeId}/details`);
})


module.exports = router;