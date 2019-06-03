import { setAlert } from './alert'
import axios from 'axios'
import {
	ADD_POST,
	ADD_COMMENT,
	GET_POST,
	GET_POSTS,
	POST_ERROR,
	UPDATE_LIKES,
	DELETE_POST,
	DELETE_COMMENT
} from './types'

export const getPosts = () => async dispatch => {
	try {
		const response = await axios.get('/api/posts')
		dispatch({
			type: GET_POSTS,
			payload: response.data
		})
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status }
		})
	}
}

export const getPostById = id => async dispatch => {
	try {
		const response = await axios.get(`/api/posts/${id}`)
		dispatch({
			type: GET_POST,
			payload: response.data
		})
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status }
		})
	}
}

export const addPost = formData => async dispatch => {
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	}
	try {
		const response = await axios.post('/api/posts', formData, config)
		dispatch({
			type: ADD_POST,
			payload: response.data
		})

		dispatch(setAlert('Post Created', 'success'))
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status }
		})
	}
}

export const deletePost = id => async dispatch => {
	try {
		const response = await axios.delete(`/api/posts/${id}`)

		dispatch({
			type: DELETE_POST,
			payload: id
		})

		dispatch(setAlert('Post deleted', 'success'))
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status }
		})
	}
}

export const likePost = id => async dispatch => {
	try {
		const response = await axios.put(`/api/posts/like/${id}`)

		dispatch({
			type: UPDATE_LIKES,
			payload: { id: id, likes: response.data }
		})
	} catch (error) {
		console.log(error)
		dispatch({
			type: POST_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status }
		})
	}
}

export const unlikePost = id => async dispatch => {
	try {
		const response = await axios.put(`/api/posts/unlike/${id}`)

		dispatch({
			type: UPDATE_LIKES,
			payload: { id: id, likes: response.data }
		})
	} catch (error) {
		console.log(error)
		dispatch({
			type: POST_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status }
		})
	}
}

export const addComment = (id, formData) => async dispatch => {
	const config = {
		headers: {
			'Content-type': 'application/json'
		}
	}
	try {
		const response = await axios.post(`/api/posts/comment/${id}`, formData, config)

		dispatch({
			type: ADD_COMMENT,
			payload: response.data
		})
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status }
		})
	}
}

export const deleteComment = (id, comment_id) => async dispatch => {
	try {
		await axios.delete(`/api/posts/comment/${id}/${comment_id}`)

		dispatch({
			type: DELETE_COMMENT,
			payload: comment_id
		})
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status }
		})
	}
}
