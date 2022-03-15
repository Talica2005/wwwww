const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
const isUser = require('./middelware/is-user')
const { readFileSync } = require('fs')
const { buildSchema } = require('graphql')

const graphQlResolvers = require('./graphql/resolvers/index')

const graphQlSchema = buildSchema(
    readFileSync('./graphql/schema/index.graphql', { encoding: 'utf-8' })
)

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }
    next()
})

app.use(isUser)

app.use(
    '/graphql',
    graphqlHTTP({
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        graphiql: true,
        GRAPHQL_DEBUG: true,
    })
)

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.d7adg.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
    )
    .then(() => {
        app.listen(8000)
    })
    .catch((err) => {
        console.log(err)
    })
