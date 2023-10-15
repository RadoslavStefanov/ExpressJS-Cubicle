const Cube = require("../models/Cube");
const cubes = [];

exports.create = async (cubeData) => {

    const cube = await Cube.create(cubeData);
    return cube;

}

exports.getAll = async () => {
    const cubes = await Cube.find().lean();
    return cubes;
}

exports.getCube = (id) =>  Cube.findById(id);