import axios from 'axios'
import { setAlert } from './alert'
import { PROFILE_ERROR, GET_PROFILE } from './types'

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
