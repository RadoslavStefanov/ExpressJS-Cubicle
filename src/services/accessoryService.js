const Accessory = require("../models/Accessory");
const accessories = [];

exports.create = async (accessoryData) => {

    const accessory = await Accessory.create(accessoryData);
    return accessory;

}

exports.getAll = async () => {
    const accessories = await Accessory.find().lean();
    return accessories;
}

exports.getAccessory = (id) =>  Accessory.findById(id);