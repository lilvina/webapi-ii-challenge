const express = require('express')

const server = express()
const mainRouter = require('./mainRouter.js')

server.use(express.json())

server.get('/', (req, res) => {
  res.send(`
    <h1>Lambda Posts API</h1>
    <p>Welcome to the Lambda Posts API</p>`)
})

server.use('/api/posts', mainRouter)

module.exports = server
