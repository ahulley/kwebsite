import Header from '../../components/Header/Header'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setModalSigninVisibility } from '../../actions/HeaderActions'
import { signout } from '../../actions/UserActions'

const mapStateToProps = (state) => {
  return {
    isModalSigninVisible: state.HeaderReducer.isModalSigninVisible,
    loginError: state.UserReducer.authentication.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setModalSigninVisibility: (isVisible) => dispatch(setModalSigninVisibility(isVisible)),
    signout: () => { dispatch(signout()) }
  }
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps)(Header));
