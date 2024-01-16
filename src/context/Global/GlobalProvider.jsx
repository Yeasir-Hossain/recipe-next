"use client"
import { createContext, useContext } from 'react';
import useModal from '@/hooks/Global/useModal';

/**
 * React context for global state management, specifically handling modals.
 * 
 * @constant {object} context - The context object created using createContext from React.
 */
const context = createContext();

/**
 * React component that provides a global context for managing modals.
 * 
 * @component
 * @param {object} children - The child components to be wrapped by the GlobalProvider.
 */
export default function GlobalProvider({ children }) {
  return (
    <context.Provider value={{
      ...useModal(),
    }}>
      {children}
    </context.Provider >
  );
}

/**
 * Custom hook for accessing the global context provided by GlobalProvider.
 * 
 * @function
 * @returns {object} - An object containing modal-related state and functions.
 */
export const useGlobalCtx = () => useContext(context);