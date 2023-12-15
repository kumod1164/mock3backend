const express = require("express");

const {ProfileModel} = require("../models/UserProfile.model")
const {UserModel} = require("../models/User.models")

const ProfileRouter = express.Router();

ProfileRouter.get("/", async(req, res)=>{
    const profile = await UserModel.find({});
    res.send({profile:profile})
})

ProfileRouter.post("/create", async(req, res)=>{
    const {name, email} = req.body;
    const userId = req.userId;

    const user = await UserModel.findOne({id:userId})
    const mail = user.email;

    const prl = await ProfileModel.create({name,email:mail})
    res.send({prl:prl})
})