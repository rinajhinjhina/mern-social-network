const express = require('express')

const router = new express.Router()

router.get('/', (req, res)=> {
    console.log(req)
    res.send('Hello from the other side')
})

module.exports = router