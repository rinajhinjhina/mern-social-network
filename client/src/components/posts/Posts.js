import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { getPosts } from '../../actions/post'
import { connect } from 'react-redux'
import PostsForm from './PostsForm'
import PostsItem from './PostsItem'
import Spinner from '../layout/Spinner'

const Posts = ({ getPosts, auth: { isAuthenticated }, post: { posts, loading } }) => {
	useEffect(
		() => {
			isAuthenticated && getPosts()
		},
		[getPosts, isAuthenticated]
	)
	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className="large text-primary">Posts</h1>
			<p className="lead">
				<i className="fas fa-user" /> Welcome to the community!
			</p>
			<PostsForm />
			<div className="posts">
				{posts.length > 0 ? posts.map(post => <PostsItem post={post} key={post._id} />) : <Spinner />}
			</div>
		</Fragment>
	)
}

Posts.propTypes = {
	post: PropTypes.object.isRequired,
	getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	post: state.post,
	auth: state.auth
})

export default connect(mapStateToProps, { getPosts })(Posts)
