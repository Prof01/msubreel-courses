// ApplicationContext.js
'use client'
import React, { createContext, useContext, useReducer, useRef, useEffect } from 'react';
import { applicationReducer, initialState } from './applicationReducer';

const ApplicationContext = createContext();

const ApplicationProvider = ({ children }) => {
    const applicationRef = useRef(null);
  
    useEffect(() => {
      // Create the application instance only on the client side
      if (typeof window !== 'undefined') {
        applicationRef.current = new window.application();
      }
    }, []);
  
    const [state, dispatch] = useReducer(applicationReducer, initialState);
      
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
