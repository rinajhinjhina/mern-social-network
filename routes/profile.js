const express = require('express')
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator/check')
const request = require('request')
const config = require('config')

const Profile = require('../models/Profile')
const User = require('../models/User')

const router = new express.Router()

/* 
*  @route   GET api/profile/me
*  @desc    Get current users profile 
*  @access  Private
*/
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])
		if (!profile) {
			return res.status(400).json({ msg: 'No profile for this user' })
		}

		res.json(profile)
	} catch (e) {
		console.error(e.message)
		res.status(500).send('Server error')
	}
})
/* 
*  @route   POST api/profile
*  @desc    Create or update users profile 
*  @access  Private
*/
router.post(
	'/',
	[
		auth,
		[
			check('status', 'Status is required')
				.not()
				.isEmpty(),
			check('skills', 'Skills is required')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() })
			}

			const {
				company,
				website,
				location,
				bio,
				status,
				skills,
				githubusername,
				youtube,
				twitter,
				facebook,
				linkedin,
				instagram
			} = req.body

			const profileFields = {}

			profileFields.social = {}

			profileFields.user = req.user.id
			if (company) profileFields.company = company
			if (website) profileFields.website = website
			if (location) profileFields.location = location
			if (bio) profileFields.bio = bio
			if (status) profileFields.status = status
			if (githubusername) profileFields.githubusername = githubusername
			if (skills) profileFields.skills = skills.split(',').map(skill => skill.trim())
			if (youtube) profileFields.social.youtube = youtube
			if (twitter) profileFields.social.twitter = twitter
			if (facebook) profileFields.social.facebook = facebook
			if (linkedin) profileFields.social.linkedin = linkedin
			if (instagram) profileFields.social.instagram = instagram

			let profile = await Profile.findOne({ user: req.user.id })

			if (profile) {
				profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
				return res.json(profile)
			}

			profile = new Profile(profileFields)

			await profile.save()
			res.json(profile)
		} catch (e) {
			console.error(e.message)
			res.status(500).send('Server error')
		}
	}
)
/*
*  @route   GET api/profile/user
*  @desc    Get all user profiles
*  @access  Public
*/
router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', ['name', 'avatar'])
		if (!profiles) {
			return res.status(400).json({ msg: 'No profiles found' })
		}

		return res.send(profiles)
	} catch (e) {
		console.error(e.message)
		res.status(500).send('Server error')
	}
})

/*
*  @route   GET api/profile/user/:id
*  @desc    Get profile by ID
*  @access  Public
*/

router.get('/user/:id', async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.params.id }).populate('user', ['name', 'avatar'])
		if (!profile) {
			return res.status(400).json({ msg: 'Profile not found' })
		}

		return res.send(profile)
	} catch (e) {
		console.error(e.message)
		if (e.kind === 'Objectid') {
			return res.status(400).json({ msg: 'Profile not found' })
		}
		res.status(500).send('Server error')
	}
})

/*
*  @route   POST api/profile/experience
*  @desc    Add profile experience
*  @access  Private
*/

router.post(
	'/experience',
	[
		auth,
		[
			check('title', 'Title is required')
				.not()
				.isEmpty(),
			check('company', 'Company is required')
				.not()
				.isEmpty(),
			check('from', 'From date is required')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() })
			}

			const { title, company, location, from, to, current, description } = req.body

			const newExp = {
				title,
				company,
				location,
				from,
				to,
				current,
				description
			}

			const profile = await Profile.findOne({ user: req.user.id })
			profile.experience.unshift(newExp)
			await profile.save()

			res.json(profile)
		} catch (e) {
			console.error(e.message)
			res.status(500).send('Server error')
		}
	}
)

/*
*  @route   DELETE api/profile/experience
*  @desc    Delete profile experience
*  @access  Private
*/

router.delete('/experience/:id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id })

		const removeIndex = profile.experience.map(item => item._id).indexOf(req.params.id)

		profile.experience.splice(removeIndex, 1)
		await profile.save()
		res.json(profile)
	} catch (e) {
		console.error(e.message)
		res.status(500).send('Server error')
	}
})

/*
*  @route   POST api/profile/education
*  @desc    Add profile education
*  @access  Private
*/

router.post(
	'/education',
	[
		auth,
		[
			check('school', 'School is required')
				.not()
				.isEmpty(),
			check('degree', 'Degree is required')
				.not()
				.isEmpty(),
			check('fieldofstudy', 'Field of study date is required')
				.not()
				.isEmpty(),
			check('from', 'From date is required')
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() })
			}

			const { school, degree, fieldofstudy, from, to, current, description } = req.body

			const newEdu = {
				school,
				degree,
				fieldofstudy,
				from,
				to,
				current,
				description
			}

			const profile = await Profile.findOne({ user: req.user.id })
			profile.education.unshift(newEdu)
			await profile.save()

			res.json(profile)
		} catch (e) {
			console.error(e.message)
			res.status(500).send('Server error')
		}
	}
)

/*
*  @route   DELETE api/profile/experience
*  @desc    Delete profile experience
*  @access  Private
*/

router.delete('/education/:id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id })

		const removeIndex = profile.education.map(item => item._id).indexOf(req.params.id)

		profile.education.splice(removeIndex, 1)
		await profile.save()
		res.json(profile)
	} catch (e) {
		console.error(e.message)
		res.status(500).send('Server error')
	}
})

/* 
* @route 	GET api/profile/github/:username
* @desc 	Get user repos from Github
* @access 	Public
*/
router.get('/github/:username', (req, res) => {
	try {
		const options = {
			uri: `https://api.github.com/users/${req.params
				.username}/repos?per_page=5&sort=created:asc&client_id=${config.get(
				'githubClientId'
			)}&client_secret=${config.get('githubClientSecret')}`,
			method: 'GET',
			headers: { 'user-agent': 'node.js' }
		}

		request(options, (error, response, body) => {
			if (error) console.error(error)

			if (response.statusCode !== 200) {
				return res.status(404).json({ msg: 'No Github profile found' })
			}

			res.json(JSON.parse(body))
		})
	} catch (e) {
		console.error(e.message)
		res.status(500).send('Server error')
	}
})

/*
*  @route   DELETE api/profile/user/:id
*  @desc    Find one profile and remove profile, posts, and user
*  @access  Public
*/

router.delete('/user/:id', auth, async (req, res) => {
	try {
		if (req.user.id !== req.params.id) {
			return res.status(401).send()
		}

		await Profile.findOneAndDelete({ user: req.params.id })
		await User.findOneAndDelete({ _id: req.params.id })

		return res.json({ msg: 'User deleted' })
	} catch (e) {
		console.error(e.message)
		if (e.kind === 'Objectid') {
			return res.status(400).json({ msg: 'Profile not found' })
		}
		res.status(500).send('Server error')
	}
})

module.exports = router
