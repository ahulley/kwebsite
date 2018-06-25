import { connect } from 'react-redux'
import Home from '../../components/Home/Home';

/*const mapStateToProps = (state) => {
  return {
    postsList: state.UserPostsReducer.postsList,
    isModalVisible: state.GlobalReducer.isModalVisible
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => {
      dispatch(fetchPosts()).then((response) => {
        !response.error ? dispatch(fetchPostsSuccess(response.payload.data)) : dispatch(fetchPostsFailure(response.payload.data));
      });
    },
    setModalVisibility: (isVisible) => dispatch(setModalVisibility(isVisible)),
  }
}*/

export default connect(
  null,
  null
)(Home)
