import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { deletePost, likePost, unlikePost } from '../../actions/post'

const PostsItem = ({
	post: { _id, text, name, avatar, date, likes, comments, user },
	auth,
	deletePost,
	likePost,
	unlikePost
}) => {
	const liked = likes.some(like => like.user === auth.user._id)

	const onClickLike = e => {
		liked ? unlikePost(_id) : likePost(_id)
	}

	return (
		<div className="post bg-white p-1 my-1">
			<div>
				<a href={`/profile/${user}`}>
					<img className="round-img" src={avatar} alt="" />
					<h4>{name}</h4>
				</a>
			</div>
			<div>
				<p className="my-1">{text}</p>
				<p className="post-date">
					Posted on <Moment format="MM-DD-YYYY">{date}</Moment>
				</p>
				<button
					type="button"
					className={liked ? 'btn-success btn btn-light' : 'btn btn-light'}
					onClick={e => onClickLike(e)}
				>
					<i className="fas fa-thumbs-up" />
					<span>{' ' + likes.length}</span>
				</button>
				<Link to={`/post/${_id}`} className="btn btn-primary">
					Discussion <span className="comment-count">{' ' + comments.length}</span>
				</Link>
				{auth.user._id === user && (
					<button type="button" className="btn btn-danger">
						<i className="fas fa-times" onClick={e => deletePost(_id)} />
					</button>
				)}
			</div>
		</div>
	)
}

PostsItem.propTypes = {
	auth: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
	deletePost: PropTypes.func.isRequired,
	likePost: PropTypes.func.isRequired,
	unlikePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps, { deletePost, likePost, unlikePost })(PostsItem)
