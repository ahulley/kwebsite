import * as types from '../constants/ActionTypes'
import 'babel-polyfill'

export const setModalSigninVisibility = (isModalSigninVisible) => async dispatch => {
  dispatch({ type: types.SET_MODALSIGNIN_VISIBILITY, payload: isModalSigninVisible });
};
