import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment, deleteComment } from '../../actions/post'

const CommentForm = ({ postId, addComment }) => {
	const [formData, setFormData] = useState({
		text: ''
	})
	return (
		<div className="post-form">
			<div className="bg-primary p">
				<h3>Leave A Comment</h3>
			</div>
			<form className="form my-1" onSubmit={() => addComment(postId, formData)}>
				<textarea
					name="text"
					cols="30"
					rows="5"
					placeholder="Comment on this post"
					value={formData.text}
					onChange={e => setFormData({ text: e.target.value })}
					required
				/>
				<input type="submit" className="btn btn-dark my-1" value="Submit" />
			</form>
		</div>
	)
}

CommentForm.propTypes = {
	postId: PropTypes.string.isRequired,
	addComment: PropTypes.func.isRequired
}

export default connect(null, { addComment })(CommentForm)
