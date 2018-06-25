import * as types from '../constants/ActionTypes'
import * as User from '../models/User'
import 'babel-polyfill'
import decode from 'jwt-decode'
import { ROOT_URL } from '../constants/MiscConstants'
import axios from 'axios'

export const setCurrentUserFromToken = (token) => async dispatch => {
  try {
    dispatch({ type: types.SET_CURRENT_USER_FROM_TOKEN });

    const userID = decode(token).sub;
    const response = await dispatch(User.find({ _id: userID }));

    if (response.error) {
      dispatch(setCurrentUserFromTokenFailure(response.error));
    }
    else if (response.length === 1) {
      dispatch(setCurrentUserFromTokenSuccess(response[0]));
    }
    else {
      dispatch(setCurrentUserFromTokenFailure('More than one user found'));
    }
  }
  catch (error) {
    dispatch(setCurrentUserFromTokenFailure(error));
  }
}

export const setCurrentUserFromTokenSuccess = (user) => async dispatch => {
  dispatch({ type: types.SET_CURRENT_USER_FROM_TOKEN_SUCCESS, payload: user })
}

export const setCurrentUserFromTokenFailure = (error) => async dispatch => {
  dispatch({ type: types.SET_CURRENT_USER_FROM_TOKEN_FAILURE, payload: error });
}

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios({
      method: 'post',
      data: formProps,
      url: `${ROOT_URL}/signup`,
      headers: []
    });

    dispatch({ type: types.AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (error) {
    //handleError(dispatch, error);
  }
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    dispatch({ type: types.AUTH_USER });

    const response = await axios({
      method: 'post',
      data: formProps,
      url: `${ROOT_URL}/signin`,
      headers: []
    })
      .catch((error) => {
        throw new Error(error.response.data.error);
      });

    if (!response.data.error) {
      dispatch(signinSuccess(response.data.token, callback));
    }
    else {
      dispatch(signinFailure(reponse.error));
    }

  } catch (error) {
    dispatch(signinFailure(error.message));
  }
}

export const signinSuccess = (token, callback) => async dispatch => {
  dispatch({ type: types.AUTH_USER_SUCCESS, payload: token });
  localStorage.setItem('token', token);
  dispatch(setCurrentUserFromToken(token));
  callback();
}

export const signinFailure = (error) => async dispatch => {
  dispatch({ type: types.AUTH_USER_FAILURE, payload: error });
}



export const signout = () => async dispatch => {
  localStorage.removeItem('token');
  dispatch({
    type: types.AUTH_USER_SUCCESS,
    payload: ''
  });
  dispatch({
    type: types.SET_CURRENT_USER_FROM_TOKEN_SUCCESS,
    payload: {}
  });
}
