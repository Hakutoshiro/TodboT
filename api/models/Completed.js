const mongoose = require('mongoose')

const CompletedSchema =new mongoose.Schema({
    tasks: {type:String},
})

const CompletedModel = mongoose.model('CompletedDB',CompletedSchema)
module.exports = CompletedModel;