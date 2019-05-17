const express = require('express')

const router = new express.Router()

/* 
*  @route   GET api/profile
*  @desc    Test route 
*  @access  Public
*/
router.get('/profile', (req, res)=> {
    console.log(req)
    res.send('Hello from the other side')
})

module.exports = router 