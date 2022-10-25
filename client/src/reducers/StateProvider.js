/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-indent */
import { createContext, useContext, useReducer } from 'react'

export const StateContext = createContext()

// eslint-disable-next-line react/prop-types, comma-spacing
export function StateProvider({ reducer, initialState, children }) {
  // eslint-disable-next-line prettier/prettier, react/jsx-wrap-multilines
  return <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
}

// eslint-disable-next-line eol-last
export const useStateValue = () => useContext(StateContext)