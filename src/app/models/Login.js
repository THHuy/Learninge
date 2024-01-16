const mongoose = require("mongoose");


const loginSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type:String},
    phone: {type: Number},
    fullname: String
},
{
    timestamps: true
}
);

module.exports = loginSchema;
