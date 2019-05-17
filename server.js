const express = require('express')

const connectDB = require('./config/db')

const app = express()
const port = process.env.PORT || 5000

//Connect database
connectDB()

app.use('/api/users', require('./routes/users')) 
app.use('/api/auth', require('./routes/auth')) 
app.use('/api/profile', require('./routes/profile')) 
app.use('/api/posts', require('./routes/posts')) 

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})