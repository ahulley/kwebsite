import * as types from '../constants/ActionTypes'

export const INITIAL_STATE = {
  authentication: {
    token: '',
    error: null,
    loading: false
  },
  currentUser: {
    user: null,
    error: null,
    loading: false
  },
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.AUTH_USER:
      return {
        ...state,
        authentication: {
          token: '',
          error: null,
          loading: true
        }
      };
    case types.AUTH_USER_SUCCESS:
      return {
        ...state,
        authentication: {
          token: action.payload,
          error: null,
          loading: false
        }
      };
    case types.AUTH_USER_FAILURE:
      return {
        ...state,
        authentication: {
          token: '',
          error: action.payload,
          loading: false
        }
      };
    case types.SET_CURRENT_USER_FROM_TOKEN:
      return {
        ...state,
        currentUser: {
          user: null,
          error: null,
          loading: true
        }
      };
    case types.SET_CURRENT_USER_FROM_TOKEN_SUCCESS:
      return {
        ...state,
        currentUser: {
          user: action.payload,
          error: null,
          loading: false
        }
      };
    case types.SET_CURRENT_USER_FROM_TOKEN_FAILURE:
      return {
        ...state,
        currentUser: {
          user: null,
          error: action.payload,
          loading: false
        }
      };
    default:
      return state;
  }
}
