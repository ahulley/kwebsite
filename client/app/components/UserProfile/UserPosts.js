import React, { Component } from 'react'
import { fetchPosts } from '../../actions/UserProfile/UserPostsActions'
import ModalCreateUserPostContainer from '../../containers/UserProfile/Modals/ModalCreateUserPostContainer'
import './userposts.scss'
import '../../styles/modalstyles.scss'

//Modal.setAppElement(document.getElementById('app'))

class UserPosts extends Component {
  constructor(props) {
    super(props);
    this.openCreateUserPostModal = this.openCreateUserPostModal.bind(this);
    this.closeCreateUserPostModal = this.closeCreateUserPostModal.bind(this);
  }

  componentWillMount() {
    //this.props.fetchPosts();
  }

  render() {
    const { posts } = this.props.postsList;
    return (
      <div className="userposts-userposts">
        <h1>User posts </h1>
        <ModalCreateUserPostContainer
          isModalVisible={this.props.isModalVisible}
          closeCreateUserPostModal={(value) => this.closeCreateUserPostModal(value)}
        />
        <ul>
          {this.renderPosts(posts)}
        </ul>
        <button className="btn btn-primary" onClick={this.openCreateUserPostModal} > Make post</button>
      </div>
    )
  }

  renderPosts(posts) {
    return posts.map((post) => {
      return (
        <li key={post._id} className="card text-white bg-primary mb-3" style={{ maxWidth: '30rem' }}>
            <div className="card-header">
              {post.title}
            </div>
            <div className="card-body">
              {post.description}
            </div>
        </li >
      );
    });
  }


  openCreateUserPostModal() {
    this.props.setModalVisibility(true);
  }

  closeCreateUserPostModal(isSavePost) {
    if (isSavePost) {
      this.refreshPostList();
    }

    this.props.setModalVisibility(false);
  }

  refreshPostList() {
    console.log("refreshing post list...");
  }
}


export default UserPosts;
