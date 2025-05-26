const router = require("express").Router();
const user = require("../Models/user");
const bcrypt =  require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authToken} = require("./userAuth");
const Book = require("../Models/book");

//add book to favourite
router.put("/add-book",authToken,async(req,res)=>{
    try {
        const {bookid,id} = req.headers;
        const currentUser = await user.findById(id);
        const isFavourite = currentUser.favourites.includes(bookid);
        if(isFavourite){
            return res.status(200).json({message:"Book is already in favourites"});
        }
        await user.findByIdAndUpdate(id,{$push:{favourites:bookid}});
        return res.status(200).json({message:"Book added to favourites"});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
});

//delete book from favourite
router.delete("/delete-book",authToken,async(req,res)=>{
    try {
        const {bookid,id} = req.headers;
        const currentUser = await user.findById(id);
        const isFavourite = currentUser.favourites.includes(bookid);
        if(isFavourite){
            await user.findByIdAndUpdate(id,{$pull:{favourites:bookid}});
        }
        return res.status(200).json({message:"Book removed from favourites"});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
});

//get all favourite books of user
router.get("/get-all",authToken,async(req,res)=>{
    try {
        const {id} = req.headers;
        const currentUser = await user.findById(id).populate("favourites");  
        const favBooks = currentUser.favourites;
        return res.status(200).json({data:favBooks});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
});

module.exports = router;