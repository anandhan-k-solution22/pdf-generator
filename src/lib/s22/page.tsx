"use client";

import React, { ReactNode } from "react";
import { View } from "@react-pdf/renderer";

export const PdfPage: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export const PageBreak: React.FC = () => {
  return <View break />;
};


