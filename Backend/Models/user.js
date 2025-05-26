const mongoose = require("mongoose");

const user = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    avater:{
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/050/716/788/non_2x/male-avatar-icon-with-question-mark-having-unknown-identity-vector.jpg",
    },
    role:{
        type: String,
        default: "user",
        enum: ["user","admin"]
    },
    favourites:[{
        type: mongoose.Types.ObjectId,
        ref: "books"
    }],
    cart:[{
        type: mongoose.Types.ObjectId,
        ref: "books"
    }],
    orders:[{
        type: mongoose.Types.ObjectId,
        ref: "order"
    }],
},{timestamps: true}
);

module.exports = mongoose.model("user",user);