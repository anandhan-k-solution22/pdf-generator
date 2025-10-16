"use client";

import React, { createContext, useContext, ReactNode } from "react";

export type PdfData = unknown;

const PdfDataContext = createContext<PdfData | undefined>(undefined);

export const DataProvider: React.FC<{ data: PdfData; children: ReactNode }> = ({ data, children }) => {
  return <PdfDataContext.Provider value={data}>{children}</PdfDataContext.Provider>;
};

export const usePdfData = <T = any,>(): T => {
  const ctx = useContext(PdfDataContext);
  return ctx as T;
};


