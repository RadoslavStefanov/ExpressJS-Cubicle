const User = require("../models/User");
const bcrypt = require("bcrypt ");

exports.register = async (userData) => {
    return User.create(userData);
}

exports.login() = async (loginData) => {    
    const user = await User.findOne(loginData.username).lean();

    
    if(!user){
        throw new Error("Invalid username or password!");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid){
        throw new Error("Invalid username or password!");
    }

    return user;
}