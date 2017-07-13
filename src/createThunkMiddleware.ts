import * as Redux from 'redux'

function createThunkMiddleware (extraArgument?: any): Redux.Middleware {
  return ({dispatch, getState}) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument)
    }

    return next(action)
  }
}

export default createThunkMiddleware
