const express = require('express')
const path = require('path')

const connectDB = require('./config/db')

const app = express()
const port = process.env.PORT || 5000

//Connect database
connectDB()

// Init middleware
app.use(express.json({ extended: false }))

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/profile', require('./routes/profile'))
app.use('/api/posts', require('./routes/posts'))

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
