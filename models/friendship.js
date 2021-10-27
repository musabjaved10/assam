const mongoose = require('mongoose')
const {Schema} = {mongoose}

const friendShipSchema = new Schema({
    user_1:{
        type:String,
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'

        },
    },
    user_2:{
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
    }
})

const Friendship = mongoose.model('Friendship', friendShipSchema)
module.exports = Friendship