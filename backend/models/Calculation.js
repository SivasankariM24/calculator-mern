const mongoose = require('mongoose');

const calculationSchema = new mongoose.Schema(
    {
        num1 : Number,
        num2 : Number,
        operation : String,
        result : Number,
        createdAt:{
            type : Date,
            default : Date.now
        }
    }
);

module.exports = mongoose.model('Calculation',calculationSchema);