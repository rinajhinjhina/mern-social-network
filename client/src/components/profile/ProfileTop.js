import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({ profile: { user, company, status, social, location, website } }) => {
	return (
		<div className="profile-top bg-primary p-2">
			<img className="round-img my-1" src={user.avatar} alt="" />
			<h1 className="large">{user.name}</h1>
			<p className="lead">
				{status}
				{company && ` at ${company}`}
			</p>
			<p>{location && <span>{location}</span>}</p>
			<div className="icons my-1">
				{website && (
					<a href={`//${website}`} target="_blank" rel="noopener noreferrer">
						<i className="fas fa-globe fa-2x" />
					</a>
				)}
				{social &&
					social.twitter && (
						<a href={social.twitter} target="_blank" rel="noopener noreferrer">
							<i className="fab fa-twitter fa-2x" />
						</a>
					)}
				<a href="#" target="_blank" rel="noopener noreferrer">
					<i className="fab fa-facebook fa-2x" />
				</a>
				<a href="#" target="_blank" rel="noopener noreferrer">
					<i className="fab fa-linkedin fa-2x" />
				</a>
				<a href="#" target="_blank" rel="noopener noreferrer">
					<i className="fab fa-youtube fa-2x" />
				</a>
				<a href="#" target="_blank" rel="noopener noreferrer">
					<i className="fab fa-instagram fa-2x" />
				</a>
			</div>
		</div>
	)
}

ProfileTop.propTypes = {}

export default ProfileTop
