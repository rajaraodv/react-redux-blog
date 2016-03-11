import { connect } from 'react-redux'
import { fetchPosts, fetchPostsSuccess, fetchPostsFailure } from '../actions/index';

import PostsList from '../components/PostsList';


const mapStateToProps = (state) => {
  return {
    posts: state.posts.postsList.posts,
    loading: state.posts.postsList.loading
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => {
      dispatch(fetchPosts()).then((response) => {
        let data = response.payload.data ? response.payload.data : {data: 'Network Error'};
        !response.error ? dispatch(fetchPostsSuccess(data)) : dispatch(fetchPostsFailure(data));
      });
    }
  }
}


const PostsListContainer = connect(mapStateToProps, mapDispatchToProps)(PostsList)

export default PostsListContainer
