import React, { Component } from 'react'
import {connect } from 'react-redux'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form'
import { renderField } from '../../FormComponents'
import '../../../styles/modalstyles.scss'

const validateForm = values => {
  const errors = {};
  errors.username = validateUsername(values);
  errors.password = validatePassword(values);
  return errors;
}

const validateUsername = ({ username }) => {
  if(!username) {
    return 'Required';
  }
}

const validatePassword = ({ password }) => {
  if (!password) {
    return 'Required';
  }
}

//this accepts username or email as the username during login
class ModalSignin extends Component {
  constructor(props) {
    super(props);
    this.hideModal = this.hideModal.bind(this);
  }
  
  hideModal() {
    //empty the fields too
    this.props.reset();
    this.props.closeModal();
  }

  onSubmit = (formProps) => {
    this.props.signin(formProps, () => {
      //they can do this anywhere, why redirect them?
      //this.props.history.push('/');
      this.hideModal();
    });
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <Modal
        isOpen={this.props.isModalVisible}
        toggle={this.hideModal}
        className="modal-signin"
      >
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <ModalHeader>
              Login
          </ModalHeader>
          <ModalBody>
            <div className="text-danger">{this.props.loginError}</div>
            <Field
              name="username"
              type="text"
              component={renderField}
              placeholder="Username or Email"
            />
            <Field
              name="password"
              type="password"
              component={renderField}
              placeholder="Password"
            />
          </ModalBody>
          <ModalFooter>
            <div>
              <RRNavLink to="/Signup" onClick={this.hideModal}>
                Register here
              </RRNavLink>
            </div>
            <div>
              <button className="btn btn-primary modal-footer-item-right" disabled={submitting || pristine}>Login</button>
              <button className="btn btn-secondary modal-footer-item-right" onClick={this.hideModal} > Cancel</button>
            </div>
          </ModalFooter>
        </form>
      </Modal>

    );
  }
}

export default (reduxForm({
  form: 'ModalSignin',
  validate: validateForm
})(ModalSignin));

