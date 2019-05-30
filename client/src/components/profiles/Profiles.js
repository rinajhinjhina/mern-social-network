import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'
import { getAllProfiles } from '../../actions/profile'
import ProfilesItem from './ProfilesItem'

const Profiles = ({ getAllProfiles, profile: { profiles, loading } }) => {
	useEffect(
		() => {
			getAllProfiles()
		},
		[loading, getAllProfiles]
	)

	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					<h1 className="large text-primary">Developers</h1>
					<p className="lead">
						<i className="fab fa-connectdevelop"> Browse and connect with developers</i>
					</p>
					<div className="profiles">
						{profiles.length > 0 ? (
							profiles.map(profile => <ProfilesItem key={profile._id} profile={profile} />)
						) : (
							<h3>No profiles found</h3>
						)}
					</div>
				</Fragment>
			)}
		</Fragment>
	)
}

Profiles.propTypes = {
	profile: PropTypes.object.isRequired,
	getAllProfiles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile
})

export default connect(mapStateToProps, { getAllProfiles })(Profiles)
