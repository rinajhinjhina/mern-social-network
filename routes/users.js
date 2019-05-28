const express = require('express')
const { check, validationResult } = require('express-validator/check')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const router = new express.Router()

const User = require('../models/User')

/* 
*  @route   POST  api/register
*  @desc    Test route 
*  @access  Public
*/

router.post(
	'/',
	[
		check('name', 'Name is required')
			.not()
			.isEmpty(),
		check('email', 'Please enter a valid email').isEmail(),
		check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { name, email, password } = req.body

		try {
			let user = await User.findOne({ email })

			if (user) {
				res.status(400).send({ errors: [{ msg: 'User already exists' }] })
			}

			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm'
			})

			user = new User({
				name,
				email,
				avatar,
				password
			})

			const salt = await bcrypt.genSalt(10)
			user.password = await bcrypt.hash(password, salt)

			await user.save()

			const payload = {
				user: {
					id: user.id
				}
			}

			jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 }, (err, token) => {
				if (err) {
					throw err
				}
				res.json({ token })
			})
		} catch (e) {
			console.error(e.message)
			res.status(500).send('Server error')
		}
	}
)

module.exports = router
