"use client";
import GlobalProvider from "./Global/GlobalProvider";

export default function Context({ children }) {
  return (
    <GlobalProvider>
      {children}
    </GlobalProvider>
  );
}