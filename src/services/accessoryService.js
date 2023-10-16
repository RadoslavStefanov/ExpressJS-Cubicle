const Accessory = require("../models/Accessory");
const accessories = [];

exports.create = async (accessoryData) => {

    const accessory = await Accessory.create(accessoryData);
    return accessory;

}

exports.getAll = async () => Accessory.find().lean();

exports.getAccessory = (id) =>  Accessory.findById(id);

exports.getWithoutOwned = (accessoryIds) => {
    return Accessory.find({_id: {$nin: accessoryIds}});
}