// ApplicationContext.js
'use client'
import React, { createContext, useContext, useReducer, useRef, useEffect } from 'react';
import { applicationReducer, initialState } from './applicationReducer';
import { loadCreator } from './actions/creatorActions';
import { loadStudent } from './actions/studentAction';

const ApplicationContext = createContext();

const ApplicationProvider = ({ children }) => {
    const applicationRef = useRef(null);
    const [state, dispatch] = useReducer(applicationReducer, initialState);

    useEffect(() => {
      loadCreator(dispatch)
      loadStudent(dispatch)
      // Create the application instance only on the client side
      // if (typeof window !== 'undefined') {
      //   applicationRef.current = new window.application();
      // }
    }, []);
  
      
    return (
      <ApplicationContext.Provider value={{ state, dispatch, applicationRef }}>
        {children}
      </ApplicationContext.Provider>
    );
  };

const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplication must be used within an ApplicationProvider');
  }
  return context;
};

export { ApplicationProvider, useApplication };
