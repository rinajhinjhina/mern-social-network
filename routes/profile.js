const express = require('express')
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator/check')

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
	[auth, [check('status', 'Status is required').exists(), check('skills', 'Skills is required').exists()]],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() })
			}

			const { company, website, location, bio, status, skills, githubusername, social } = req.body

			const profileFields = {}
			profileFields.user = req.user.id
			if (company) profileFields.company = company
			if (website) profileFields.website = website
			if (location) profileFields.location = location
			if (bio) profileFields.bio = bio
			if (status) profileFields.status = status
			if (githubusername) profileFields.githubusername = githubusername
			if (skills) profileFields.skills = skills.split(',').map(skill => skill.trim())

			if (social) {
				const { youtube, twitter, facebook, linkedin, instagram } = social

				profileFields.social = {}
				if (youtube) profileFields.social.youtube = youtube
				if (twitter) profileFields.social.twitter = twitter
				if (facebook) profileFields.social.facebook = facebook
				if (linkedin) profileFields.social.linkedin = linkedin
				if (instagram) profileFields.social.instagram = instagram
			}

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
*  @route   DELETE api/profile/user/:id
*  @desc    Find one profile and remove profile, posts, and user
*  @access  Public
*/

router.delete('/user/:id', async (req, res) => {
	try {
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

/*
*  @route   POST api/profile/user/:id
*  @desc    Add profile experience
*  @access  Private
*/

router.post(
	'/experience',
	[
		auth,
		[
			check('title', 'Title is required').exists(),
			check('company', 'Company is required').exists(),
			check('from', 'From date is required').exists()
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

module.exports = router
