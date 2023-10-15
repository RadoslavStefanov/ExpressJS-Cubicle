const mongoose = require("mongoose");

const cubeSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficultyLevel: Number,

    accessory: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Accessory"
        }
    ]
});

const Cube = mongoose.model("Cube", cubeSchema);

module.exports = Cube;