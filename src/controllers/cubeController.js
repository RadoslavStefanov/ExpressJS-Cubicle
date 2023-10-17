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
        difficultyLevel: Number(difficultyLevel),
        owner: req.user
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

    const accessories = cube.accessories;
    const hasAccessories = cube.accessories.length > 0;

    res.render("cube/details", {selectedCube, hasAccessories});
});


router.get("/:cubeId/attach-accessory", async (req,res) =>{
    const { cubeId } = req.params;

    const selectedCube = await cubeSevice.getCube(cubeId).lean();
    const accessoriesIds = cube.accessories ? cube.accessories.map((a) => a._id) : [] ;
    const accessories = await accessoryService.getWithoutOwned(accessoriesIds).lean();

    const hasAccessories = accessories === undefined ? false : accessories.length > 0;
    res.render("accessory/attach", { selectedCube, accessories,  hasAccessories});
});

router.post("/:cubeId/attach-accessory", async (req,res) => {
    const { cubeId } = req.params;
    const { accessory: accessoryId} = req.body;
    await cubeSevice.attachAccessory(cubeId, accessory.accessoryId);

    res.redirect(`/cubes/${cubeId}/details`);
})

router.get("/:cubeId/delete", async (req,res) => {
    res.render("cube/delete")
})

router.get("/:cubeId/edit", async (req,res) => {
    res.render("cube/edit")
})


module.exports = router;