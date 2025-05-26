const mongoose = require("mongoose");

const connection = async()=>{
    try{
        await mongoose.connect(`${process.env.URL}`)
        console.log("Connected to database");

    }catch(err){
        console.log(err);
    }
};

connection();