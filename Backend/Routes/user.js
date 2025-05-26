const router = require("express").Router();
const user = require("../Models/user");
const bcrypt =  require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authToken} = require("./userAuth");

//sign up
router.post("/signUp",async (req,res)=>{
    try {
        const  {username,email,password,address,role="user"} = req.body;

        if(username.length < 4)
            res.status(400).json({message:"Username length should be more than 3 letters"});

        const existUsername = await user.findOne({username:username});
        if(existUsername)
            res.status(400).json({message:"Username already exist"});

        const existEmail = await user.findOne({email:email});
        if(existEmail)
            res.status(400).json({message:"Email already exist"});

        
        if(password.length < 6)
            res.status(400).json({message:"password length should be greater than 5"});

        const hashPass = await bcrypt.hash(password,10);

        const newUser = new user({
            username: username,
            email: email,
            password: hashPass,
            address: address,
            role: role
        });

        newUser.save();

        return res.status(200).json({message: "sign up successfully"});
    } catch (error) {
        res.status(500).json({message:"internal server error"});
    }
});

//sign in 
router.post("/signIn",async (req,res)=>{
    try {
        const  {username,password} = req.body;
        const existUser = await user.findOne({username})
        if(!existUser)
            res.status(400).json({message: "Invalid user data"});
        await bcrypt.compare(password,existUser.password,(err,data)=>{
            if(data){
                const authclaims = [
                    { name: existUser.username},
                    {role: existUser.role}
                ];
                const token = jwt.sign({authclaims},"bookstore123",{expiresIn: "30d"})
                res.status(200).json({id: existUser._id, role: existUser.role, token: token});
            }
            else{
                res.status(400).json({message: "Invalid user data"});
            }
        });
    } catch (error) {
        res.status(500).json({message:"internal server error"});
    }
});


//get user information
router.get("/get-user-info",authToken,async(req,res)=>{
try {
    const {id} = req.headers;
    const data = await user.findById(id).select("-password"); //exclude password 
    return res.status(200).json(data);
} catch (error) {
    res.status(500).json({message:"internal server error"});
}
});


//update address
router.put("/update-address",authToken,async (req,res)=>{
    try {
        const {id} = req.headers;
        const {address} = req.body;
        await user.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({message:"Address updated successfully"});

    } catch (error) {
        res.status(500).json({message:"internal server error"});
    }
});

//delete user
router.delete("/delete",authToken,async (req,res)=>{
    try {
        const {id} = req.headers;
        await user.findByIdAndDelete(id);
        return res.status(200).json({message:"User deleted successfully"});
    } catch (error) {
        res.status(500).json({message:"internal server error"});
    }
});

module.exports = router;