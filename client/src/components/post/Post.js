import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPostById } from '../../actions/post'
import Spinner from '../layout/Spinner'
import ContentForm from './CommentForm'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'

const Post = ({ getPostById, auth, post: { loading, post }, match }) => {
	useEffect(
		() => {
			auth.isAuthenticated && getPostById(match.params.id)
		},
		[auth.isAuthenticated, getPostById]
	)

	return (
		<Fragment>
			{loading || post === null ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to="/posts" className="btn">
						Back To Posts
					</Link>
					<div className="post bg-white p-1 my-1">
						<div>
							<a href={`/profile/${post.user}`}>
								<img className="round-img" src={post.avatar} alt="" />
								<h4>{post.name}</h4>
							</a>
						</div>
						<div>
							<p className="my-1">{post.text}</p>
						</div>
					</div>
					<CommentForm postId={post._id} />
					<div className="comments">
						<CommentItem post={post} user={auth.user} />
					</div>
				</Fragment>
			)}
		</Fragment>
	)
}

Post.propTypes = {
	getPostById: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	post: state.post
})

export default connect(mapStateToProps, { getPostById })(Post)
