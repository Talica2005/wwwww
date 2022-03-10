const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        requered: true,
    },
    price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    // },
})

module.exports = mongoose.model('Event', eventSchema)
