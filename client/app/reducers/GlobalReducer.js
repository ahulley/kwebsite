import * as types from '../constants/ActionTypes'

const INITIAL_STATE = {
  isModalVisible: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_MODAL_VISIBILITY:
      return {
        ...state,
        isModalVisible: action.payload
      };
    default:
      return state;
  }
}
