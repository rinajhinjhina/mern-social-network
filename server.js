const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const userRoutes = require('./routes/users')

app.use('/api/users/', userRoutes)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})