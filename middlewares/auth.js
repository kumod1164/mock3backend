const jwt = require("jsonwebtoken");

const auth = (req, res, next)=>{
    const token = req.headers.authorization.split("")[1];

    if(!token){
        return res.json({message: "Please Login"})
    }

    jwt.verify(token,"secret", function(error, decoded){
        if(error){
            return res.json({message: "Inavlid Token"})
        }
        const userId= decoded.userId;
        req.userID = userId;
        next();
    })
}

module.exports = {auth};