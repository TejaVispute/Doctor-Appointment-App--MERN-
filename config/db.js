const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log(`mongo DB connection established`.bgGreen.white)
    } catch (error) {
        console.log(`mondodb server issue: ${error}`.bgRed.white)
    }
}

module.exports = connectDB;