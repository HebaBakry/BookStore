const router = require("express").Router();
const user = require("../Models/user");
const bcrypt =  require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authToken} = require("./userAuth");
const Book = require("../Models/book");
//add book - admin
router.post("/add",authToken,async(req,res)=>{
    try {
        const {id} = req.headers;
        const currentUser = await user.findById(id);
        if(currentUser.role !== "admin"){
            return res.status(400).json({message:"You are not having access to perform admin work"});
        }

        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language
        });
        await book.save();
        res.status(200).json({message:"Book added successfully"});
    } catch (error) {
        res.status(500).json({message:"internal server error"});
    }
});


//update book - admin
router.put("/update",authToken,async (req,res)=>{
    try {
        const {bookid,id} = req.headers;

        const currentUser = await user.findById(id);
        if(currentUser.role !== "admin"){
            return res.status(400).json({message:"You are not having access to perform admin work"});
        }
        await Book.findByIdAndUpdate(bookid,{
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language
        });
        return res.status(200).json({message:"Book updated successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"An error occurred"});
    }
});


//Delete book - admin
router.delete("/delete",authToken,async (req,res)=>{
    try {
        const {bookid,id} = req.headers;
        
        const currentUser = await user.findById(id);
        if(currentUser.role !== "admin"){
            return res.status(400).json({message:"You are not having access to perform admin work"});
        }
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({message:"Book deleted successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"An error occurred"});
    }
});

//get all books
router.get("/get-all-books",async(req,res)=>{
try {
    const data = await Book.find().sort({createdAt:-1}); 
    return res.status(200).json(data);
} catch (error) {
    console.log(error);
    return res.status(500).json({message:"An error occurred"});}
});

//get recent added books limit 4
router.get("/get-recent-books",async(req,res)=>{
    try {
        const data = await Book.find().sort({createdAt:-1}).limit(4); 
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"An error occurred"});}
    });


//get book information
router.get("/get-book-info/:id",async(req,res)=>{
try {
    const {bookid} = req.headers;
    const {id} = req.params;
    const data = await Book.findById(id); 
    return res.status(200).json(data);
} catch (error) {
    res.status(500).json({message:"internal server error"});
}
});

module.exports = router;