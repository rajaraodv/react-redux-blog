import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Header from '../containers/HeaderContainer.js';

class PostsForm extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.newPost.post && !nextProps.newPost.error) {
      this.context.router.push('/');
    }
  }

  render() {
    const {asyncValidating, fields: { title, categories, content }, handleSubmit, submitting } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.props.createPost.bind(this))}>
          <div className={`form-group ${title.touched && title.invalid ? 'has-error' : ''}`}>
            <label className="control-label">Title*</label>
            <input type="text" className="form-control" {...title} />
            <div className="help-block">
              {title.touched ? title.error : ''}
            </div>
            <div className="help-block">
              {asyncValidating === 'title'? 'validating..': ''}
            </div>
          </div>

          <div className={`form-group ${categories.touched && categories.invalid ? 'has-error' : ''}`}>
            <label className="control-label">Categories*</label>
            <input type="text" className="form-control" {...categories} />
            <div className="help-block">
              {categories.touched ? categories.error : ''}
            </div>
          </div>

          <div className={`form-group ${content.touched && content.invalid ? 'has-error' : ''}`}>
            <label className="control-label">Content*</label>
            <textarea className="form-control" {...content} />
            <div className="help-block">
              {content.touched ? content.error : ''}
            </div>
          </div>

          <button type="submit" className="btn btn-primary"  disabled={submitting} >Submit</button>
          <Link to="/" className="btn btn-error">Cancel</Link>
        </form>

        <br/>
        <br/>
        <br/>

        <div className="panel panel-default">
          <div className="panel-heading"><h3>Check out Form Validations!</h3></div>
          <div className="panel-body">
            <b>Learn how to implement it by going through: <a href="https://medium.com/@rajaraodv/adding-a-robust-form-validation-to-react-redux-apps-616ca240c124" target="_blank">Adding A Robust Form Validation To React Redux Apps</a></b> 
            <ol>
              <li>
                <h4>Client Side Validation:</h4>
                1. Click on <b>Title</b> field and leave it empty.<br/>
                2. Then click on another field(to trigger blur).<br/>
                <b>Result: "Enter a Title"</b><br/>
              </li>

              <li>
                <h4>"Instant" Server Side Validation:</h4>
                Calls server w/ field values when a field is blurred (even before submitting the form).<br/>
                1. Create a post<br/>
                2. Try to create another w/ the same <b>Title</b><br/>
                3. Then click on Categories field (to trigger blur).<br/>
                <b>Result: You'll get error from the server saying "Title is not unique"</b>
              </li>

              <li>
                <h4>"onSubmit" Server Side Validation:</h4>
                This is the common scenario where the server throws some error when user clicks on submit button.<br/>
                1. Enter <b>test</b> in all the above fields.<br/>
                2. Press the Submit button.<br/>
                <b>Result: Errors below every field</b><br/>
                <i>Note: The server is hardcoded to return this error for demo purposes</i>
              </li>
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default PostsForm;
