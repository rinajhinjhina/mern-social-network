const express = require('express')
const { check, validationResult } = require('express-validator/check')

const auth = require('../middleware/auth')
const User = require('../models/User')
const Post = require('../models/Post')

const router = new express.Router()

/* 
*  @route   POST api/posts
*  @desc    Create a post 
*  @access  Private 
*/
router.post('/', [auth, [check('text', 'Text is required').exists()]], async (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}

	try {
		const user = await User.findById(req.user.id).select('-password')

		const newPost = new Post({
			text: req.body.text,
			name: user.name,
			avatar: user.avatar,
			user: user.id
		})

		const post = await newPost.save()
		res.json(post)
	} catch (e) {
		console.error(e.message)
		res.status(500).send('Server error')
	}
})

/*
* @route	route GET /api/posts/ 
* @desc		get all posts
* @access 	Private
*/
router.get('/', auth, async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 })
		return res.json(posts)
	} catch (e) {
		console.error(e.message)
		res.status(500).send()
	}
})

/*
* @route 	GET /api/posts/:id 
* @get 		post by id
* @access 	Private
*/
router.get('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)

		if (!post) {
			return res.status(404).send({ msg: 'Post not found' })
		}

		return res.json(post)
	} catch (e) {
		console.error(e.message)
		if (e.kind === 'ObjectId') {
			return res.status(404).send({ msg: 'Post not found' })
		}
		res.status(500).send()
	}
})

/*
* @route 	DELETE /api/posts/:id 
* @get 		delete post by id
* @access 	Private
*/
router.delete('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)

		if (!post) {
			return res.status(404).send({ msg: 'Post not found' })
		}

		if (post.user.toString() !== req.user.id) {
			return res.status(401).send({ msg: 'User not authorized' })
		}

		await post.remove()
		res.json('Post removed')
		return res.json(post)
	} catch (e) {
		console.error(e.message)

		if (e.kind === 'ObjectId') {
			return res.status(404).send({ msg: 'Post not found' })
		}
		res.status(500).send()
	}
})

/* 
*  @route   PUT api/posts/like/:id
*  @desc    Like a post 
*  @access  Private 
*/
router.put('/like/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)

		if(!post){
			return res.status(404).send({msg: "Post not found"})
		}

		if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
			return res.status(400).json({ msg: 'User already liked this post' })
		}


		post.likes.unshift({ user: req.user.id })

		await post.save()

		res.json(post.likes)
	} catch (e) {
		console.error(e.message)
		if (e.kind === 'ObjectId') {
			return res.status(404).send({ msg: 'Post not found' })
		}
		res.status(500).send('Server error')
	}
})

/* 
*  @route   PUT api/posts/unlike/:id
*  @desc    Unlike a post 
*  @access  Private 
*/
router.put('/unlike/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)

		if(!post){
			return res.status(404).send({msg: "Post not found"})
		}

		if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
			return res.status(400).json({ msg: 'User has not liked this post' })
		}

		const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
		post.likes.pull(post.likes[removeIndex]._id)

		await post.save()

		res.json(post.likes)
	} catch (e) {
		console.error(e.message)
		if (e.kind === 'ObjectId') {
			return res.status(404).send({ msg: 'Post not found' })
		}
		res.status(500).send('Server error')
	}
})

module.exports = router
