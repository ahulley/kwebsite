import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { renderField } from '../components/FormComponents'

const validateForm = values => {
  const errors = {};
  errors.email = validateEmail(values);
  errors.username = validateUsername(values);
  errors.password = validatePassword(values);
  errors.passwordConfirm = validatePasswordConfirm(values);
  return errors;
}

const validateEmail = ({ email }) => {
  if (!email) {
    return 'Required';
  }
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    return 'Invalid email address';
  }
};

const validateUsername = ({ username }) => {
  if (!username) {
    return 'Required';
  }
  else if (username.length < 6) {
    return 'Must be greater than 5 characters'
  }
}

const validatePassword = ({ password }) => {
  if (!password) {
    return 'Required';
  }
  else if (password.length < 8) {
    return 'Must be greater than 7 characters'
  }
  else if (!/\d/.test(password)) {
    return 'Must contain at least 1 number'
  }
  else if (!/\W+/.test(password)) {
    return 'Must contain at least 1 special character'
  }
}

const validatePasswordConfirm = ({ password, passwordConfirm }) => {
  if (!passwordConfirm) {
    return 'Required';
  }
  else if (password !== passwordConfirm) {
    return 'Passwords do not match'
  }
}

class Signup extends Component {
  onSubmit = (formProps) => {
    //formProps.preventDefault();
    this.props.signup(formProps, () => {
      this.props.history.push('/SignupLanding');
    });
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div>
            <form onSubmit={handleSubmit(this.onSubmit)}>
              <div className="text-danger">{this.props.errorMessage}</div>
              <div className="form-group">
                <Field
                  name="email"
                  type="email"
                  component={renderField}
                  autoComplete="none"
                  placeholder="Enter email"
                  label="Email:"
                  aria="emailHelp"
                  help="Your email will be kept private"
                />
              </div>
              <div className="form-group">
                <Field
                  name="username"
                  type="text"
                  component={renderField}
                  autoComplete="none"
                  placeholder="Enter username"
                  label="Username:"
                />
              </div>
              <div className="form-group">
                <Field
                  name="password"
                  type="password"
                  component={renderField}
                  autoComplete="none"
                  placeholder="Enter password"
                  label="Password:"
                  aria="passwordHelp"
                  help="Must contain at least 1 number and 1 special character (!,@,#...)"
                />
              </div>
              <div className="form-group">
                <Field
                  name="passwordConfirm"
                  type="password"
                  component={renderField}
                  autoComplete="none"
                  placeholder="Confirm password"
                  label="Confirm Password:"
                />
              </div>
              <button className="btn btn-primary float-right" disabled={submitting || pristine}> Sign up</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'Signup',
  validate: validateForm
})(Signup);
