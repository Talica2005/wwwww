const userResolver = require('./users')
const eventsResolver = require('./events')
const bookingResolver = require('./booking')

const rootResolver = {
    ...userResolver,
    ...eventsResolver,
    ...bookingResolver,
}

module.exports = rootResolver
