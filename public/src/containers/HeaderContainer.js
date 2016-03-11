import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, resetDeletedPost, deletePost, deletePostSuccess, deletePostFailure } from '../actions/index';
import Header from '../components/header.js';



function mapStateToProps(state) {
  return { 
    deletedPost: state.posts.deletedPost
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDeleteClick: () => {
      dispatch(deletePost(ownProps.postId))
      .then((response) => {
        !response.error ? dispatch(deletePostSuccess(response.payload.data)) : dispatch(deletePostFailure(response.payload.data));
      });
    },
    resetMe: () => {
      dispatch(resetDeletedPost());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
