import { ROOT_URL } from '../../constants/MiscConstants'
import * as types from '../../constants/ActionTypes'
import axios from 'axios';

//export async function, await axios
export function fetchPosts() {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/userposts`,
    headers: []
  });

  //thunk example
  /*
   * return (dispatch) => {
   *    request.then(({data}) => {
   *      dispatch({type: types.FETCH_POSTS, payload: posts})
   *      });
   * };
   * 
   * im doing this from the mapdispatchtoprops though
   */

  return {
    type: types.FETCH_POSTS,
    payload: request
  }
}

export function fetchPostsSuccess(posts) {
  return {
    type: types.FETCH_POSTS_SUCCESS,
    payload: posts
  };
}

export function fetchPostsFailure(error) {
  return {
    type: types.FETCH_POSTS_FAILURE,
    payload: error
  };
}

//export async function, await axios
export function createUserPost(props) {
  const request = axios({
    method: 'post',
    data: props,
    url: `${ROOT_URL}/userposts`,
    headers: []
  });

  return {
    type: types.CREATE_USERPOST,
    payload: request
  }
}

export function createUserPostSuccess(newPost) {
  return {
    type: types.CREATE_USERPOST_SUCCESS,
    payload: newPost
  };
}

export function createUserPostFailure(error) {
  return {
    type: types.CREATE_USERPOST_FAILURE,
    payload: error
  };
}

export const resetCreateUserPost = () => ({
  type: types.RESET_CREATE_USERPOST
})
