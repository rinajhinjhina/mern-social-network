const express = require('express')

const router = new express.Router()

/* 
*  @route   POST api/login
*  @desc    Test route 
*  @access  Public
*/
router.post('/', (req, res)=> {

    res.send('Hello from the other side')
})

module.exports = router 