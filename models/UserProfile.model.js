const mongoose = require("mongoose");

 const profileSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String
 })

 const profileModel = mongoose.model("Profile", profileSchema)

 module.exports = {profileModel};