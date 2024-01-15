"use client"
import { createContext, useContext } from 'react';
import useModal from '@/hooks/Global/useModal';

const context = createContext();

export default function GlobalProvider({ children }) {
  return (
    <context.Provider value={{
      ...useModal(),
    }}>
      {children}
    </context.Provider >
  );
}

export const useGlobalCtx = () => useContext(context);