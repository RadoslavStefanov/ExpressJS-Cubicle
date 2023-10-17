const User = require("../models/User");

exports.register = async (userData) => {
    return User.create(userData);
}