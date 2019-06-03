import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteComment } from '../../actions/post'
import Moment from 'react-moment'

const CommentItem = ({ post, user, deleteComment }) => {
	return (
		<Fragment>
			{post.comments.length > 0 &&
				post.comments.map(comment => (
					<div className="post bg-white p-1 my-1" key={comment._id}>
						<div>
							<a href={`/profile/${comment.user}`}>
								<img className="round-img" src={comment.avatar} alt="" />
								<h4>{comment.name}</h4>
							</a>
						</div>
						<div>
							<p className="my-1">{comment.text}</p>
							<p className="post-date">
								Posted on <Moment format="MM/DD/YYYY">{comment.date}</Moment>
							</p>
							{user._id === post.user && (
								<button type="button" className="btn btn-danger">
									<i className="fas fa-times" />
								</button>
							)}
						</div>
					</div>
				))}
		</Fragment>
	)
}

CommentItem.propTypes = {
	post: PropTypes.object.isRequired,
	deleteComment: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired
}

export default connect(null, { deleteComment })(CommentItem)
