/* eslint react/no-typos: 0 */

import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setAlert } from '../../actions/alert'
import PropTypes from 'prop-types'

const Register = props => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	})

	const { name, email, password, password2 } = formData

	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

	const onSubmit = async e => {
		e.preventDefault()
		if (password !== password2) {
			props.setAlert('Passwords do not match', 'danger')
		} else {
			console.log('Success')
		}
	}

	return (
		<Fragment>
			<h1 class="large text-primary">Sign Up</h1>
			<p class="lead">
				<i class="fas fa-user" /> Create Your Account
			</p>
			<form className="form" onSubmit={e => onSubmit(e)}>
				<div className="form-group">
					<input
						type="text"
						placeholder="Name"
						name="name"
						value={name}
						onChange={e => onChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						value={email}
						onChange={e => onChange(e)}
						name="email"
					/>
					<small className="form-text">
						This site uses Gravatar so if you want a profile image, use a Gravatar email
					</small>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						onChange={e => onChange(e)}
						required
						minLength="6"
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Confirm Password"
						name="password2"
						value={password2}
						onChange={e => onChange(e)}
						required
						minLength="6"
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Register" />
			</form>
			<p class="my-1">
				Already have an account? <Link to="/register">Sign In</Link>
			</p>
		</Fragment>
	)
}

Register.PropTypes = {
	setAlert: PropTypes.func.isRequired
}

export default connect(null, { setAlert })(Register)
