import React, { createContext, useContext, useReducer } from 'react';
import { initialState, reducer } from './reducer';

// Prepares the dataLayer
export const StateContext = createContext();

// Wrap our app and provide the Data layer
export const StateProvider = ({ children }) => {
  const stateValue = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={stateValue}>{children}</StateContext.Provider>
  );
};

// Pull information from the data layer
export const useStateValue = () => useContext(StateContext);
