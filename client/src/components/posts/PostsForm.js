import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { addPost } from '../../actions/post'
import { connect } from 'react-redux'

const PostsForm = ({ addPost }) => {
	const [formData, setFormData] = useState({
		text: ''
	})

	return (
		<div className="post-form">
			<div className="bg-primary p">
				<h3>Say Something...</h3>
			</div>
			<form
				className="form my-1"
				onSubmit={e => {
					e.preventDefault()
					addPost(formData)
				}}
			>
				<textarea
					name="text"
					cols="30"
					rows="5"
					placeholder="Create a post"
					onChange={e => {
						setFormData({ text: e.target.value })
					}}
					value={formData.text}
					required
				/>
				<input type="submit" className="btn btn-dark my-1" value="Submit" />
			</form>
		</div>
	)
}

PostsForm.propTypes = {
	addPost: PropTypes.func.isRequired
}

export default connect(null, { addPost })(PostsForm)
