"use client";

import React, { ReactNode } from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import { usePdfData } from "../data-context";

type DivProps = {
  children?: ReactNode | ((data: any) => ReactNode);
  padding?: number;
  margin?: number;
};

export const Div: React.FC<DivProps> = ({ children, padding = 0, margin = 0 }) => {
  const data = usePdfData<any>();
  const content = typeof children === "function" ? children(data) : children;
  return <View style={[styles.div, { padding, margin }]}>{content}</View>;
};

const styles = StyleSheet.create({
  div: {},
});


