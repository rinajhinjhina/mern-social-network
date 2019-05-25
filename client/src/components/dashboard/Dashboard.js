/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { getCurrentProfile } from '../../actions/profile'

const Dashboard = ({ getCurrentProfile, auth, profile }) => {
	useEffect(() => {
		getCurrentProfile()
	}, [])

	return <div />
}

Dashboard.propTypes = {
	getCurrentProfile: propTypes.func.isRequired,
	profile: propTypes.object.isRequired,
	auth: propTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
