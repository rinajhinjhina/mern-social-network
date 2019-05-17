const express = require('express')

const router = new express.Router()

/* 
*  @route   GET api/posts
*  @desc    Test route 
*  @access  Public
*/
router.get('/', (req, res)=> {

    res.send('Hello from the other side')
})

module.exports = router 