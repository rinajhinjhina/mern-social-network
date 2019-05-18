const express = require('express')
const auth = require('../middleware/auth')
const User  = require('../models/User')

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

module.exports = router 