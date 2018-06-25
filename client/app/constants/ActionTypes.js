//anytime i make an api call, have a success and failure option
//this only applies to when im altering the state
//obvious User.find would not have these because it's not altering state- but this is why the state changing action needs it

//global
export const SET_MODAL_VISIBILITY = 'SET_MODAL_VISIBILITY'

//Header
export const SET_MODALSIGNIN_VISIBILITY = 'SET_MODALSIGNIN_VISIBILITY'


//Auth
export const AUTH_USER = 'AUTH_USER'
export const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS'
export const AUTH_USER_FAILURE = 'AUTH_USER_FAILURE'

//User
export const SET_CURRENT_USER_FROM_TOKEN = 'SET_CURRENT_USER_FROM_TOKEN'
export const SET_CURRENT_USER_FROM_TOKEN_SUCCESS = 'SET_CURRENT_USER_FROM_TOKEN_SUCCESS'
export const SET_CURRENT_USER_FROM_TOKEN_FAILURE = 'SET_CURRENT_USER_FROM_TOKEN_FAILURE'

//Fetch post
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const RESET_POSTS = 'RESET_POSTS';

//Make post
export const MAKE_POST_TITLE_CHANGED = 'MAKE_POST_TITLE_CHANGED';
export const MAKE_POST_DESCRIPTION_CHANGED = 'MAKE_POST_DESCRIPTION_CHANGED';
export const CREATE_USERPOST = 'CREATE_USERPOST';
export const CREATE_USERPOST_SUCCESS = 'CREATE_USERPOST_SUCCESS';
export const CREATE_USERPOST_FAILURE = 'CREATE_USERPOST_FAILURE';
export const RESET_CREATE_USERPOST = 'RESET_CREATE_USERPOST';
