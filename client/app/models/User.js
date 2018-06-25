import { ROOT_URL } from '../constants/MiscConstants'
import * as types from '../constants/ActionTypes'
import axios from 'axios'
import 'babel-polyfill'

//save
//update
//delete
//validateSave?
function buildFilterURL(filter) {
  //this should be a global function for everyone to use
  var urlFilter = '';
  for (const property in filter) {
    urlFilter += `${property.toString()}=${filter[property]}&`;
  }
  return urlFilter.substring(0, urlFilter.length - 1);
}

export const find = (filter) => async dispatch => {
  const url = `${ROOT_URL}/users?${buildFilterURL(filter)}`;

  try {
    const response = await axios({
      method: 'get',
      url: url,
      headers: []
    });

    return response.data;
  }
  catch (error) {
    console.log('user.find returned error: ', error);
  }
}

export const findAll = () => async dispatch => {
  const url = `${ROOT_URL}/users`;

  try {
    const response = await axios({
      method: 'get',
      url: url,
      headers: []
    });
  }
  catch (error) {
    console.log('user.findAll returned error: ', error);
  }
}
