const express = require('express')
const {check, validationResult} = require('express-validator/check')

const router = new express.Router()

/* 
*  @route   POST  api/register
*  @desc    Test route 
*  @access  Public
*/

router.post('/', [
        check('name', 'Name is required').exists(),
        check('email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6})
    ], (req, res)=> { 
        const errors = validationResult(req)
        if(errors){
            return res.status(400).json({ errors: errors.array()})
        }
        console.log(req.body) 
        res.send('Hello from the other side')
})

module.exports = router 