import React, { Component } from 'react';
//import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    this.getPosts()
  }

  getPosts() {
    axios.get('http://localhost:4000/api/posts/')
    .then(res => {
      this.setState({
        posts: [...res.data]
      })
    })
    .catch(err => console.log(err))
  }

  deletePosts = e => {
    axios.delete(`http://localhost:4000/api/posts/${e.target.id}`)
    .then(res => {
      console.log(res.data)
      this.getPosts()
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        {this.state.posts.map(post => {
          return(
            <div className="post" key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.contents}</p>
              <button id={post.id} onClick={this.deletePosts}>Delete Post</button>
            </div>
          )
        })}
      </div>
    );
  }
}

export default App;
