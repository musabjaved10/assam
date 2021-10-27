const mongoose = require('mongoose')

const {Schema} = mongoose

const campusSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true
    },
    img:{
        type:String
    }
})

const Campus = mongoose.model('Campus', campusSchema)
module.exports = Campus