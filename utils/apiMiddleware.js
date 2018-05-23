import { AsyncStorage } from 'react-native';

let HEADERS = ['access-token', 'token-type', 'client', 'expiry', 'uid']

const tokenMiddleware = args => store => next => action => {
  if (!action)
    action = { type: '' }
  let { customHeaders = [], validateAction = 'VALIDATE_TOKEN',  logoutAction = 'LOGOUT', axios } = args;
  HEADERS = [...new Set([...HEADERS, ...customHeaders])]
  if (action.type === validateAction) {
    HEADERS.forEach( token => {
      AsyncStorage.getItem(token)
        .then( value => { 
          axios.defaults.headers.common[token] = value 
        })
    });
  } else if (action.type === logoutAction) {
    HEADERS.forEach( token => {
      AsyncStorage.removeItem(token);
    });
  } else {
    let { headers } = action;
    if (headers) {
      if(headers['access-token']) {
        HEADERS.forEach( token => {
          axios.defaults.headers.common[token] = headers[token];
          try {
            AsyncStorage.setItem(token, headers[token])
          } catch (err) {
            console.log(err)
          }
        })
      }
    }
  }
  return next(action)
}

export default tokenMiddleware