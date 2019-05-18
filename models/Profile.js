const {Schema, model} = require('mongoose');

const ProfileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	company: {
		type: String
	},
	website: {
		type: String
	},
	bio: {
		type: String
	},
	location: {
		type: String
	},
	status: {
		type: String,
		required: true
	},
	skills: {
		type: [ String ],
		required: true
	},
	githubusername: {
		type: String
	},
	experience: [
		{
			title: {
				type: String,
				required: true
			},
			company: {
				type: String,
				required: true
			},
			location: {
				type: String
			},
			from: {
				type: Date,
				rquired: true
			},
			to: {
				type: Date
			},
			current: {
				type: Boolean,
				default: false
			},
			description: {
				type: String
			}
		}
	],
	social: {
		youtube: {
			type: String
		},
		twiiter: {
			type: String
		},
		facebook: {
			type: String
		},
		linkedin: {
			type: String
		},
		instagram: {
			type: String
		}
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('profiles', ProfileSchema)
