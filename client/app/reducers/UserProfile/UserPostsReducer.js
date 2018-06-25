import * as types from '../../constants/ActionTypes'

const INITIAL_STATE = {
  postsList: {
    posts: [],
    error: null,
    loading: false
  },
  newPost: {
    title: "",
    description: "",
    error: null,
    loading: false
  }
}

export default (state = INITIAL_STATE, action) => {
  let error;//whats this?

  switch (action.type) {
    case types.FETCH_POSTS:
      return {
        ...state,
        postsList: {
          posts: [],
          error: null,
          loading: true
        }
      };
    case types.FETCH_POSTS_SUCCESS:// return list of posts and make loading = false
      return {
        ...state,
        postsList: {
          posts: action.payload,
          error: null,
          loading: false
        }
      };
    case types.FETCH_POSTS_FAILURE:// return error and make loading = false
      error = action.payload || { message: action.payload.message };//2nd one is network or server down errors
      return {
        ...state,
        postsList: {
          posts: [],
          error: error,
          loading: false
        }
      };
    case types.CREATE_USERPOST:
      return {
        ...state,
        newPost: {
          ...state.newPost,
          loading: true
        }
      }
    case types.CREATE_USERPOST_SUCCESS:
      return {
       ...state,
        newPost: {
          title: "",
          description: "",
          error: null,
          loading: false
        }
      }
    case types.CREATE_USERPOST_FAILURE:
      error = action.payload || { message: action.payload.message };//2nd one is network or server down errors
      return {
        ...state,
        newPost: {
          error: error,
          loading: false
        }
      }
    case types.RESET_CREATE_USERPOST:
      return {
        ...state,
        newPost: INITIAL_STATE.newPost
      }
    default:
      return state;
  }
}
