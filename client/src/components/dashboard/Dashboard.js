import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import { getCurrentProfile, deleteAccount } from '../../actions/profile'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'

const Dashboard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading }, deleteAccount }) => {
	useEffect(
		() => {
			if (user && !profile) getCurrentProfile()
		},
		[user, profile, getCurrentProfile]
	)
	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className="large text-primary">Dashboard</h1>
			<p className="lead">
				<i className="fas fa-user" /> Welcome {user && user.name}
			</p>
			{profile ? (
				<Fragment>
					<DashboardActions />
					{profile.experience && <Experience experience={profile.experience} />}
					{profile.education && <Education education={profile.education} />}
				</Fragment>
			) : (
				<Fragment>
					<p>You have yet to set up a user profile</p>
					<Link to="/create-profile" className="btn btn-primary my-1">
						Create profile
					</Link>
				</Fragment>
			)}

			<div className="my-2">
				<button className="btn btn-danger" onClick={e => deleteAccount(user._id)}>
					<i className="fas fa-user" /> Delete my account
				</button>
			</div>
		</Fragment>
	)
}

Dashboard.propTypes = {
	getCurrentProfile: propTypes.func.isRequired,
	profile: propTypes.object.isRequired,
	auth: propTypes.object.isRequired,
	deleteAccount: propTypes.func.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)
