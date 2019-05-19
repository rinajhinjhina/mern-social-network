const { Schema, model } = require('mongoose')

const postSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	text: {
		type: String,
		required: true
	},
	name: {
		type: String
	},
	avatar: {
		type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
	likes: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users',
				required: true
			},
			name: {
				type: String
			},
			avatar: {
				type: String
			},
			date: {
				type: Date,
				default: Date.now()
			}
		}
	],
	comments: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'users',
				required: true
			},
			text: {
				type: String,
				required: true
			},
			name: {
				type: String
			},
			avatar: {
				type: String
			},
			date: {
				type: Date,
				default: Date.now()
			}
		}
	]
})

module.exports = model('Post', postSchema)
