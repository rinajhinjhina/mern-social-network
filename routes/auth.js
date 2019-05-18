const express = require('express')
const auth = require('../middleware/auth')
const User  = require('../models/User')
const { check, validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const router = new express.Router()

/* 
*  @route   POST api/login
*  @desc    Test route 
*  @access  Public
*/
router.get('/', auth, async (req, res)=> {
    try{
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    }catch(e){
        console.error(e.message)
        res.status(500).send('Server error')
    }
})

router.post(
	'/',
	[
		check('email').isEmail(),
		check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (errors.length > 0) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ errors: [ { msg: 'Invalid credentials' } ] });
			}

			const payload = {
				user: {
					id: user.id
				}
            }
            
            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                return res.status(400).json({ errors: [ { msg: 'Invalid credentials' } ] })
            }

			jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 }, (err, token) => {
				if (err) {
					throw err;
				}
				res.json({ token })
			})
		} catch (e) {
			console.error(e.message);
			res.status(500).send('Server error');
		}
	}
)

module.exports = router 