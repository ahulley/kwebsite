import { connect } from 'react-redux'
import { makePostTitleChanged, makePostDescriptionChanged } from '../../../actions/UserProfile/UserPostsActions';
import { createUserPost, createUserPostSuccess, createUserPostFailure, resetCreateUserPost } from '../../../actions/UserProfile/UserPostsActions';
import ModalCreateUserPost from '../../../components/UserProfile/Modals/ModalCreateUserPost'

const mapStateToProps = (state) => {
  return {
    newPost: state.UserPostsReducer.newPost,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createUserPost: (values) => {
      dispatch(createUserPost(values)).then((reponse) => {
        !response.error ? dispatch(createUserPostSuccess(response.payload.data)) : dispatch(createUserPostFailure(response.payload.data));
      });
    },
    resetCreateUserPost: () => dispatch(resetCreateUserPost),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalCreateUserPost)
