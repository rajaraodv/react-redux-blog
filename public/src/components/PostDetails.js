import React, { Component, PropTypes } from 'react';
//import { connect } from 'react-redux';
//import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
  }

  componentDidMount() {
    this.props.fetchPost(this.props.postId);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.activePost.error) {
      alert('No such post');
      this.context.router.push('/');
    }
  }

  render() {
    const { post } = this.props.activePost;

    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

export default PostDetails;
