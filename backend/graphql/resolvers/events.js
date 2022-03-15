const Event = require('../../models/event')
const User = require('../../models/user')
const { changeEvent } = require('./join')

module.exports = {
    events: async (args, req) => {
        // if (!req.isAuth) {
        //     throw new Error('Unauthenticated!')
        // }
        try {
            const events = await Event.find({ user: req.userId })
            return events.map((event) => {
                return changeEvent(event)
            })
        } catch (err) {
            throw err
        }
    },

    events: async () => {
        try {
            const events = await Event.find()
            return events.map((event) => {
                return changeEvent(event)
            })
        } catch (err) {
            throw err
        }
    },

    createEvent: async (args, req) => {
        if (!req.isUser) {
            throw new Error('Unauthenticated!')
        }
        const event = new Event({
            name: args.eventInput.name,
            phone: args.eventInput.phone,
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),

            creator: req.userId,
        })
        let createdEvent
        try {
            const result = await event.save()
            createdEvent = changeEvent(result)
            const creator = await User.findById(req.userId)

            if (!creator) {
                throw new Error('User not found.')
            }
            creator.createdEvents.push(event)
            await creator.save()

            return createdEvent
        } catch (err) {
            console.log(err)
            throw err
        }
    },

    updateEvent: async (args, req) => {
        // if (!req.isUser) {
        //     throw new Error('Unauthenticated!')
        // }
        var event = await Event.findById(args.id)
        Object.assign(event, args.eventInput)
        try {
            const result = await event.save()
            return event
        } catch (err) {
            console.log(err)
            throw err
        }
    },

    cancelEvent: async (args, req) => {
        if (!req.isUser) {
            throw new Error('Unauthenticated!')
        }
        try {
            const event = await Event.findById(args.eventId)

            await Event.deleteOne({ _id: args.eventId })
            return event
        } catch (err) {
            throw err
        }
    },
}
