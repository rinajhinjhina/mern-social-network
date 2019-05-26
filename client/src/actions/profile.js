import axios from 'axios'
import { setAlert } from './alert'
import { PROFILE_ERROR, GET_PROFILE, UPDATE_PROFILE } from './types'

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
