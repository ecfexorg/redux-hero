import * as Redux from 'redux'

export interface Dispatch<S = any> extends Redux.Dispatch<S> {
  <R, E>(asyncAction: ThunkAction<R, S, E>): R
}

export type ThunkAction<R = any, S = any, E = any> =
  (dispatch: Dispatch<S>, getState: () => S, extraArgument: E) => R
