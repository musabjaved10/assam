const mongoose = require('mongoose')


const friendSchema =  mongoose.Schema({
    friends:[]
})

const Friend = mongoose.model('Friend', friendSchema)
module.exports = Friend