import React, { Component } from 'react';
import { Link } from 'react-router';

class PostsList extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  renderCategories(categories) {
    return categories.map((c) => {
      c = c.trim();
      return (
        <Link to={"filter/" + c} key={c} className="list-group-item-text">{" " + c + " "}</Link>
      );
    });
  }

  renderPosts(posts) {
    return posts.map((post) => {
      return (
        <li className="list-group-item" key={post._id}>
          <Link style={{color:'black'}} to={"posts/" + post._id}>
            <h3 className="list-group-item-heading">{post.title}</h3>
          </Link>
          {this.renderCategories(post.categories)}
        </li>
      );
    });
  }

  render() {
    if(this.props.loading) {
      return <div><h1>Posts</h1><h3>Loading...</h3></div>
    }

    return (
      <div>
        <h1>Posts</h1>
        <ul className="list-group">
          {this.renderPosts(this.props.posts)}
        </ul>
      </div>
    );
  }
}

export default PostsList;
