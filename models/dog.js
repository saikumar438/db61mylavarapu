const mongoose = require("mongoose")
const costumeSchema = mongoose.Schema({
    dogname: {
        type: String,
        required: [true, "Dogname is Required"]
    },
    breed: {
        type: String,
        required: [true, "DogBreed is Required"]
    },
    price: {
        type: Number,
        required: [true,"Price of the Dog is required"],
        min:[100,"Price Should be minimum of 100$ "],
        max:[5000,"Price Cannot be greater than 5000$ "]

    }
})
module.exports = mongoose.model("DOg", costumeSchema)