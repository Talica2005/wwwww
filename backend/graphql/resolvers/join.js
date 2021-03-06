const DataLoader = require('dataloader')

const Event = require('../../models/event')
const User = require('../../models/user')
const { dateToString } = require('../../tools/date')

const eventLoader = new DataLoader((eventIds) => {
    return events(eventIds)
})

const userLoader = new DataLoader((userIds) => {
    return User.find({ _id: { $in: userIds } })
})

const events = async (eventIds) => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } })
        return events.map((event) => {
            return changeEvent(event)
        })
    } catch (err) {
        throw err
    }
}

const singleEvent = async (eventId) => {
    try {
        const event = await eventLoader.load(eventId.toString())
        return event
    } catch (err) {
        throw err
    }
}

const user = async (userId) => {
    try {
        const user = await userLoader.load(userId.toString())
        return {
            ...user._doc,
            _id: user.id,
            createdEvents: () => eventLoader.loadMany(user._doc.createdEvents),
        }
    } catch (err) {
        throw err
    }
}

const changeEvent = (event) => {
    return {
        ...event._doc,
        _id: event.id,
        user: user.bind(this, event._doc.user),
        date: dateToString(event._doc.date),
        creator: user.bind(this, event.creator),
    }
}

// const changeBooking = (booking) => {
//     return {
//         ...booking._doc,
//         _id: booking.id,
//         user: user.bind(this, booking._doc.user),
//         event: singleEvent.bind(this, booking._doc.event),
//         createdAt: dateToString(booking._doc.createdAt),
//         updatedAt: dateToString(booking._doc.updatedAt),
//     }
// }

exports.changeEvent = changeEvent
// exports.changeBooking = changeBooking
