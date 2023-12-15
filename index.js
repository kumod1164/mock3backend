const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cors= require("cors")

const {connection } = require("./configs/db.js")
const {auth}= require("./middlewares/auth.js")
const {UserModel} = require("./models/User.models")
const {ProfileRouter} = require("./routes/profile.routes.js")
const app = express();
app.use(express.json())

app.use(cors({origin:"*"}))
app.get("/", (req,res)=>{
    res.json({message:"Hello"})
})

app.post("/register", async(req, res)=>{
    const {email, pass} = req.body;
    const userExists = await UserModel.findOne({email})
    if(userExists){
        return res.status(404).json({message: "User already registered to this site, Please Login"})
    }
    bcrypt.hash(pass, 5, async function(err, hash){
        await UserModel.create({email,pass:hash})
        return res.json({message: "Registered Successfully"})
    })
})


app.post("/login", async(req, res)=>{
    const {email, pass}= req.body;

    const user = await UserModel.findOne({email});
        if(!user){
            return res.json({message: "User doesn't seems to registered this site, Please Register First"})
        }

        const hashed_password = user?.pass;
        bcrypt.compare(pass, hashed_password, function(error, result){
            if (result) {
                const token = jwt.sign({userId:userId}, 'secret!')
                return res.json({message: "Token validated"})
            } else {
                return res.json({message:"Invalid Credentials"})
            }
        })
})
app.use(auth)
//app.use("/proflie", ProfileRouter)


app.listen(8080, async()=>{
    try {
        await connection
        console.log("Server is running fine!")
    } catch (error) {
        console.log(error)
    }
})
