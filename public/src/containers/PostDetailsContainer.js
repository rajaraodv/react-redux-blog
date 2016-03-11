import PostDetails from '../components/PostDetails.js';
import { fetchPost, fetchPostSuccess, fetchPostFailure, resetActivePost } from '../actions/index';
import { connect } from 'react-redux';



function mapStateToProps(globalState, ownProps) {
  return { activePost: globalState.posts.activePost, postId: ownProps.id };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPost: (id) => {
      dispatch(fetchPost(id))
      .then((data) =>
      {
        !data.error ? dispatch(fetchPostSuccess(data.payload)) : dispatch(fetchPostFailure(data.payload));
      })
    },
    resetMe: () => {
      dispatch(resetActivePost());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
