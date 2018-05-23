import axios from 'axios';
import { AUTH_URL } from '../utils/urls.js';

export const login = (email, password, history) => {
  return (dispatch) => {
    axios.post(`${AUTH_URL}/sign_in`, { email, password })
      .then( res => {
        dispatch(loginUser(res.data.data, res.headers));
        history.push('/');
      });
  }
}

export const register = (email, password, password_confirmation, history) => {
  return (dispatch) => {
    axios.post(AUTH_URL, { email, password, password_confirmation })
      .then( res => {
        dispatch(loginUser(res.data.data, res.headers))
        history.push('/')
      })
  }
}

export const logout = (history) => {
  return (dispatch) => {
    axios.delete(`${AUTH_URL}/sign_out`)
      .then( res => { 
        dispatch({ type: 'LOGOUT' }) 
        dispatch({ type: 'NEW_GAME' })
        history.push('/login')
      })
  }
}

export const validateToken = (callBack = () => {}) => {
  return (dispatch) => {
    dispatch({ type: 'VALIDATE_TOKEN' })
    const headers = axios.defaults.headers.common;
    axios.get(`${AUTH_URL}/validate_token`, headers)
      .then( res => {
        dispatch(loginUser(res.data.data, res.headers));
      })
      .catch( () => callBack() );
  }
}

const loginUser = (user, headers) => {
  return { type: 'LOGIN', user, headers }
}