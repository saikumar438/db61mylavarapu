const mongoose = require("mongoose")
const costumeSchema = mongoose.Schema({
    dogname: String,
    breed: String,
    price: Number
})
module.exports = mongoose.model("DOg", costumeSchema)