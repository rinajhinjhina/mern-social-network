import axios from 'axios'
import { setAlert } from './alert'
import {
	PROFILE_ERROR,
	GET_PROFILE,
	GET_PROFILES,
	UPDATE_PROFILE,
	CLEAR_PROFILE,
	ACCOUNT_DELETED,
	GET_REPOS
} from './types'

export const getCurrentProfile = () => async dispatch => {
	try {
		const res = await axios.get('/api/profile/me')

		dispatch({
			type: GET_PROFILE,
			payload: res.data
		})
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		})
	}
}

export const getAllProfiles = () => async dispatch => {
	try {
		const res = await axios.get('/api/profile/')

		dispatch({
			type: CLEAR_PROFILE
		})

		dispatch({
			type: GET_PROFILES,
			payload: res.data
		})
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		})
	}
}

export const getProfileById = userId => async dispatch => {
	try {
		const res = await axios.get(`/api/profile/user/${userId}`)

		dispatch({
			type: GET_PROFILE,
			payload: res.data
		})
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		})
	}
}

export const getGithubRepos = username => async dispatch => {
	try {
		console.log(`/api/profile/github/${username}`)
		const res = await axios.get(`/api/profile/github/${username}`)

		dispatch({
			type: GET_REPOS,
			payload: res.data
		})
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		})
	}
}

export const createProfile = (formData, history, edit = false) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-type': 'application/json'
			}
		}

		const res = await axios.post('/api/profile', formData, config)

		dispatch({
			type: GET_PROFILE,
			payload: res.data
		})

		dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'))

		if (!edit) {
			history.push('/dashboard')
		}
	} catch (err) {
		const errors = err.response.data.errors

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		})
	}
}

export const addExperience = (formData, history) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-type': 'application/json'
			}
		}

		const res = await axios.post('/api/profile/experience', formData, config)

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		})

		dispatch(setAlert('Experience added', 'success'))

		history.push('/dashboard')
	} catch (err) {
		const errors = err.response.data.errors

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		})
	}
}

export const deleteExperience = id => async dispatch => {
	try {
		const res = await axios.delete(`/api/profile/experience/${id}`)

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		})

		dispatch(setAlert('Experience deleted', 'success'))
	} catch (err) {
		const errors = err.response.data.errors

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		})
	}
}

export const addEducation = (formData, history) => async dispatch => {
	try {
		const config = {
			headers: {
				'Content-type': 'application/json'
			}
		}

		const res = await axios.post('/api/profile/education', formData, config)

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		})

		dispatch(setAlert('Education added', 'success'))

		history.push('/dashboard')
	} catch (err) {
		const errors = err.response.data.errors

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		})
	}
}

export const deleteEducation = id => async dispatch => {
	try {
		const res = await axios.delete(`/api/profile/education/${id}`)

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data
		})

		dispatch(setAlert('Education deleted', 'success'))
	} catch (err) {
		const errors = err.response.data.errors

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		})
	}
}

export const deleteAccount = id => async dispatch => {
	if (window.confirm('Are you sure? This cannot be undone.')) {
		try {
			await axios.delete(`/api/profile/user/${id}`)

			dispatch({ type: CLEAR_PROFILE })
			dispatch({ type: ACCOUNT_DELETED })

			dispatch(setAlert('Your account has been permanently deleted'))
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.statusText, status: err.response.status }
			})
		}
	}
}
