import * as Redux from 'redux'

export {default as thunk} from 'redux-thunk'
export {default as createReducer} from './createReducer'

export interface Dispatch<S = any> extends Redux.Dispatch<S> {
  <R, E>(asyncAction: ThunkAction<R, S, E>): R
}

export interface ThunkAction <R = any, S = any, E = any> {
  (dispatch: Dispatch<S>, getState: () => S, extraArgument: E): R
}
