import * as Redux from 'redux'

export type ReducerMiddleware<S> = (next: ReducerHandler<S>, state: S, payload: any, action: any) => S

export type ReducerHandler<S> = (state: S, payload: any, action: any) => S

export interface ReducerHandlers<S> {
  [type: string]: ReducerHandler<S>
}

const defaultMiddleware: ReducerMiddleware<any> = (next, state, payload, action) => next(state, payload, action)
const defaultHandler: ReducerHandler<any> = (state) => state

function createReducer <S = any> (initialState: S, handlers: ReducerHandlers<S>): Redux.Reducer<S>
function createReducer <S = any> (initialState: S, middleware: ReducerMiddleware<S>, handlers: ReducerHandlers<S>): Redux.Reducer<S>
function createReducer <S = any> (...args: any[]) {

  const initialState: S = args[0]
  let middleware: ReducerMiddleware<S> = defaultMiddleware
  let handlers: ReducerHandler<S> = args[1]

  if (typeof handlers === 'function') {
    middleware = args[1]
    handlers = args[2]
  }

  if (typeof initialState !== 'object') {
    throw new Error('Invalid initialState')
  }

  if (typeof handlers !== 'object') {
    throw new Error('Invalid handlers')
  }

  return (state: S = initialState, action: any = {}) => {
    const {type, payload} = action
    let handler = (type && handlers[type]) ? handlers[type] : defaultHandler

    return middleware(handler, state, payload, action)
  }
}

export default createReducer
