import React, { Component } from 'react'
import { Modal } from 'reactstrap'
import { createUserPost, createUserPostSuccess, createUserPostFailure } from '../../../actions/UserProfile/UserPostsActions'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import { renderField, renderTextArea } from '../../FormComponents'

const validateAndCreatePost = (values, dispatch) => {
  return dispatch(createUserPost(values))
    .then(result => {
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(createPostFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }
      //let other components know that everything is fine by updating the redux` state
      dispatch(createPostSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
    });
}


class ModalCreateUserPost extends Component {

  render() {
    const { handleSubmit, submitting, newPost } = this.props;

    return (
      <Modal
        show={this.props.isModalVisible}
        onHide={() => this.closeForm()}
      >
        <form onSubmit={handleSubmit(validateAndCreatePost)} >
          <Modal.Header>
          Create new post
          </Modal.Header>
          <Modal.Body>
            <Field
              name="title"
              type="text"
              component={renderField}
              placeholder="title"
            />
            <Field
              name="description"
              type="text"
              component={renderTextArea}
              placeholder="description"
            />
          </Modal.Body>
          <Modal.Footer className="modal-footer">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    )
  }

  closeForm() {
    this.resetForm();
    this.props.closeCreateUserPostModal(false)
  }

  resetForm() {
    this.props.reset();
  }

}


export default reduxForm({
form: 'ModalCreateUserPost'
})(ModalCreateUserPost);
