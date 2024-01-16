"use client";
import store from "@/lib/store";
import GlobalProvider from "./Global/GlobalProvider";
import { Provider } from 'react-redux';

/**
 * React component that serves as the top-level context provider for the application.
 * Combines Redux store and custom global context (GlobalProvider) to manage global state.
 * 
 * @component
 * @param {object} children - The child components to be wrapped by the Context component.
 */
export default function Context({ children }) {
  return (
    <Provider store={store}>
      <GlobalProvider>
        {children}
      </GlobalProvider>
    </Provider>
  );
}