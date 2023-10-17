const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

userSchema.virtuals('repeatPassword').set(function (value) {
    if(value !== this.password){
        throw new mongoose.MongooseError("Password missing");
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User; 