import { connect } from 'react-redux'
import { signin } from '../../../actions/UserActions'
import ModalSignin from '../../../components/Header/Modals/ModalSignin'

const mapDispatchToProps = (dispatch) => {
  return {
    signin: (formProps, callback) => {
      dispatch(signin(formProps, callback));
    }
  }
}

export default connect(
  null,
  mapDispatchToProps)(ModalSignin)
