const jwt = require("../lib/jwt");

exports.auth = async(req, res, next) => {
    const token = req.cookies["auth"];

    if(token){
        try{
            const decodedToken = await jwt.verify(token, "secret");
            req.user = decodedToken;
            next();
        }
        catch (error){
            res.cookieClear("auth");
            res.redirect("/");
        }
    }
    else
        next()
};