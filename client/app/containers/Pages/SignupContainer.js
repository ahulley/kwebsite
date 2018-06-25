import { connect } from 'react-redux'
import Signup from '../../pages/Signup'
import * as actions from '../../actions/UserActions'

const mapStateToProps = (state) => {
  return {
    errorMessage: state.UserReducer.errorMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (formProps, callback) => {
      signup(formProps);
    }
  }
}

export default connect(
  mapStateToProps,
  actions)(Signup)


