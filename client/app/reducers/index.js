import { combineReducers } from 'redux'
import GlobalReducer from './GlobalReducer'
import UserPostsReducer from './UserProfile/UserPostsReducer'
import UserReducer from './UserReducer'
import HeaderReducer from './HeaderReducer'
import { reducer as formReducer } from 'redux-form'


export default combineReducers({
  GlobalReducer,
  UserPostsReducer,
  UserReducer,
  HeaderReducer,
  form: formReducer
});
