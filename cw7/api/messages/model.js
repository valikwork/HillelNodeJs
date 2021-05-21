const { Schema, Types, model } = require('mongoose')

const MessagesSchema = new Schema({
    _id: {
        type: Types.ObjectId,
        default: Types.ObjectId
    },
    user: {
        type: String,
        trim: true,
        index: true, 
        required: true,
        minLenght: 3
    },
    text: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    collection: "messages"
})

module.exports = model("MessagesModel", MessagesSchema)