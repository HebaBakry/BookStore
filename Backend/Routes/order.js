const router = require("express").Router();
const user = require("../Models/user");
const bcrypt =  require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authToken} = require("./userAuth");
const Book = require("../Models/book");
const order = require("../Models/order");

//place order
router.post("/place-order",authToken,async(req,res)=>{
    try {
        const {id} = req.headers;
        const {order} = req.body;

        for(const book of order){
            const newOrder = new order({user:id,book:book._id});
            const orderDataFromDB = await newOrder.save();

            //saving order in user data
            await user.findByIdAndUpdate(id,{
                $push:{orders: orderDataFromDB._id}
            });

            //clear cart
            await user.findByIdAndUpdate(id,{
                $pull:{cart: book._id}
            });
        }

        return res.status(200).json({message:"Order placed successfully"});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
});


//get order history of user
router.get("/get-order-history",authToken,async(req,res)=>{
    try {
        const {id} = req.headers;
        const currentUser = await user.findById(id).populate({
            path:"orders"}).
            populate({path:"book"});

        const ordersData = currentUser.orders.reverse();
        return res.status(200).json({data:ordersData});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
});

//get all orders -admin
router.get("/get-all",authToken,async(req,res)=>{
    try {

        // const {id} = req.headers;

        // const currentUser = await user.findById(id);
        // if(currentUser.role !== "admin"){
        //     return res.status(400).json({message:"You are not having access to perform admin work"});
        // }

        const data = await order.find()
        .populate({
            path:"book"
        })
        .populate({
            path:"user",
        })
        .sort({createdAt: -1});

        return res.status(200).json({data:data});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"internal server error"});
    }
});


//update order - admin
router.put("/update",authToken,async (req,res)=>{
    try {
        const {orderid,id} = req.headers;

        // const currentUser = await user.findById(id);
        // if(currentUser.role !== "admin"){
        //     return res.status(400).json({message:"You are not having access to perform admin work"});
        // }

        await order.findByIdAndUpdate(orderid,{
            status:req.body.status
        });
        return res.status(200).json({message:"Status updated successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"An error occurred"});
    }
});


module.exports = router;