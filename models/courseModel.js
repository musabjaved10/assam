const mongoose = require('mongoose')

const {Schema} = mongoose

const courseSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    courseType:{
        type:String,
        enum: ['Compulsory', 'Optional'],
        required:true,
        default:'Compulsory'
    }
})