import React from "react";
import { HelmetProvider as ReactHelmetProvider } from "react-helmet-async";
/**
 * A wrapper component to provide Helmet context to the application
 */
export default function HelmetProvider({ children }) {
  return <ReactHelmetProvider>{children}</ReactHelmetProvider>;
}
