import * as types from '../constants/ActionTypes'

export const setModalVisibility = (isModalVisible) => ({
  type: types.SET_MODAL_VISIBILITY,
  payload: isModalVisible
});

