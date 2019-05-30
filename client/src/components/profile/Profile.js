/* eslint react/no-typos: 0 */
import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getProfileById } from '../../actions/profile'
import ProfileTop from './ProfileTop'

const Profile = ({ match, auth, profile: { loading, profile }, getProfileById }) => {
	useEffect(
		() => {
			getProfileById(match.params.id)
		},
		[getProfileById, match.params.id]
	)

	return (
		<Fragment>
			{profile === null || loading ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to="/profiles" className="btn btn-light">
						Back to profiles
					</Link>
					{auth.isAuthenticated &&
						auth.loading === false &&
						auth.user._id === profile.user._id && (
							<Link to="/edit-profile" className="btn btn-dark">
								Edit profile
							</Link>
						)}
					<div className="profile-grid my-1">
						<ProfileTop profile={profile} />
					</div>
				</Fragment>
			)}
		</Fragment>
	)
}

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
})

Profile.PropTypes = {
	auth: PropTypes.object.isRequired,
	getProfileById: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { getProfileById })(Profile)
