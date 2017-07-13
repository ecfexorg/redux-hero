import * as Redux from 'redux'

export type ReducerHandler<S> = (state: S, payload: any, action: any) => S

export interface ReducerHandlers<S> {
  [type: string]: ReducerHandler<S>
}

function createReducer <S = any> (initialState: S, handlers: ReducerHandlers<S>): Redux.Reducer<S> {
  if (typeof initialState !== 'object') {
    throw new Error('invalid initialState')
  }

  if (typeof handlers !== 'object') {
    throw new Error('invalid handlers')
  }

  return (state: S = initialState, action: any = {}) => {
    const {type, payload} = action

    if (type) {
      const handler = handlers[type]

      if (handler && typeof handler === 'function') {
        return handler(state, payload, action)
      }
    }

    return state
  }
}

export default createReducer
