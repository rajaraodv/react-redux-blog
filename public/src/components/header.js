import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';


class Header extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
    this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.deletedPost.error) {
      alert('Could not delete. Please try again.');
    } else if(nextProps.deletedPost.post && !nextProps.deletedPost.error) {
      this.context.router.push('/');
    }
  }

  renderLinks() {
    const { type } = this.props;
    if(type === 'posts_index') {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li style={{paddingRight: '20px'}} role="presentation">
            <Link style={{color:'#3385ff',  fontSize: '18px'}} to="/posts/new">
              New Post
            </Link>
          </li>
        </ul>
      );
    } else if(type === 'posts_new') {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li style={{paddingRight: '10px'}} role="presentation">
            <Link className="text-xs-right" to="/">Back To Index</Link>
          </li>
        </ul>
      );
    } else if(type === 'posts_show') {
      return (
        <span>
          <ul className="nav navbar-nav navbar-left">
            <li style={{paddingRight: '20px'}} role="presentation"><Link to="/">Back To Index</Link></li>
          </ul>
          <div className="navbar-form navbar-right" style={{paddingRight: '30px'}}>
            <button className="btn btn-warning pull-xs-right"  onClick={()=> {this.props.onDeleteClick()}}>Delete Post</button>
          </div>
        </span>
      );
    }
  };

  render() {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div id="navbar" className="navbar-collapse collapse">
          {this.renderLinks()}
        </div>
      </nav>
    );
  }
}

export default Header
