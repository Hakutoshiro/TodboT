const mongoose = require('mongoose')

const TodoSchema =new mongoose.Schema({
    tasks: {type:String},
})

const todoModel = mongoose.model('TodoDB',TodoSchema)
module.exports = todoModel;