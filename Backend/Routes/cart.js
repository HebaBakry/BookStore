const router = require("express").Router();
const user = require("../Models/user");
const bcrypt =  require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authToken} = require("./userAuth");
const Book = require("../Models/book");

//add book to cart
router.put("/add-book",authToken,async(req,res)=>{
    try {
        const {bookid,id} = req.headers;
        const currentUser = await user.findById(id);
        const isExsit = currentUser.cart.includes(bookid);
        if(isExsit){
            return res.status(200).json({message:"Book is already in cart"});
        }
        await user.findByIdAndUpdate(id,{$push:{cart:bookid}});
        return res.status(200).json({message:"Book added to cart"});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
});


//delete book from cart
router.delete("/delete-book",authToken,async(req,res)=>{
    try {
        const {bookid,id} = req.headers;
        const currentUser = await user.findById(id);
        const isExsit = currentUser.cart.includes(bookid);
        if(isExsit){
            await user.findByIdAndUpdate(id,{$pull:{cart:bookid}});
        }
        return res.status(200).json({message:"Book removed from cart"});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
});


//get all cart books of user
router.get("/get-all",authToken,async(req,res)=>{
    try {
        const {id} = req.headers;
        const currentUser = await user.findById(id).populate("cart");  
        const cartBooks = currentUser.cart.reverse();
        return res.status(200).json({data:cartBooks});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
});

module.exports = router;