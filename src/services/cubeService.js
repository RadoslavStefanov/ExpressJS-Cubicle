 const Cube = require("../models/Cube");
const cubes = [];

exports.create = async (cubeData) => {

    const cube = await Cube.create(cubeData);
    return cube;

}

exports.getAll = () => {
    return [...cubes];
}

exports.getCube = (id) => {
    return [...cubes].find(x => x.id === id);
}