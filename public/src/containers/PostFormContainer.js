import PostsForm from '../components/PostsForm.js';
import { createPost, createPostSuccess, createPostFailure, resetNewPost, validatePostFields, validatePostFieldsSuccess, validatePostFieldsFailure } from '../actions/index';
import { reduxForm } from 'redux-form';

//Client side validation
function validate(values) {
  const errors = {};

  if (!values.title || values.title.trim() === '') {
    errors.title = 'Enter a Title';
  }
  if (!values.categories || values.categories.trim() === '') {
    errors.categories = 'Enter categories';
  }
  if(!values.content || values.content.trim() === '') {
    errors.content = 'Enter some content';
  }

  return errors;
}

//For instant async server validation
const asyncValidate = (values, dispatch) => {

  return new Promise((resolve, reject) => {

    dispatch(validatePostFields(values))
    .then((response) => {
      let data = response.payload.data;
      //if status is not 200 or any one of the fields exist, then there is a field error
      if(response.payload.status != 200 || data.title || data.categories || data.description) {
        //let other components know of error by updating the redux` state
        dispatch(validatePostFieldsFailure(response.payload));
        reject(data); //this is for redux-form itself
      } else {
        //let other components know that everything is fine by updating the redux` state
        dispatch(validatePostFieldsSuccess(response.payload)); //ps: this is same as dispatching RESET_POST_FIELDS
        resolve();//this is for redux-form itself
      }
    });

  });

};

//For any field errors upon submission (i.e. not instant check)
const validateAndCreatePost = (values, dispatch) => {

  return new Promise((resolve, reject) => {

    dispatch(createPost(values))
    .then((response) => {
      let data = response.payload.data;
      //if any one of these exist, then there is a field error
      if(response.payload.status != 200) {
        //let other components know of error by updating the redux` state
        dispatch(createPostFailure(response.payload));
        reject(data); //this is for redux-form itself
      } else {
        //let other components know that everything is fine by updating the redux` state
        dispatch(createPostSuccess(response.payload));
        resolve();//this is for redux-form itself
      }
    });

  });

};


const mapDispatchToProps = (dispatch) => {
  return {
    createPost: validateAndCreatePost,
    resetMe: () =>{
      dispatch(resetNewPost());
    }
  }
}


function mapStateToProps(state, ownProps) {
  return { 
    newPost: state.posts.newPost
  };
}


// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'PostsNewForm', 
  fields: ['title', 'categories', 'content'],
  asyncValidate,
  asyncBlurFields: ['title'],
  validate
}, mapStateToProps, mapDispatchToProps)(PostsForm);
