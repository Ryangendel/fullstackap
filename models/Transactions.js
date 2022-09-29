const mongoose = require("mongoose")

const TransactionsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    value:{
        type:Number,
        required:true
    }, 
    date: {
        type: Date,
        default: Date.now
      }
})

const Transactions = mongoose.model("transactions", TransactionsSchema)

module.exports = Transactions;