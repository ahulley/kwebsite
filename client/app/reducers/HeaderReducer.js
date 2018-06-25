import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {
  isModalSigninVisible: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_MODALSIGNIN_VISIBILITY:
      return {
        ...state,
        isModalSigninVisible: action.payload
      }
    default:
      return state;
  }
}
