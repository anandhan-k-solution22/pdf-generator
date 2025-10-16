"use client";

import React, { ReactNode } from "react";
import { View, StyleSheet } from "@react-pdf/renderer";

type BodyProps = {
  children: ReactNode;
  reserveTop?: number; // px reserved for header
  reserveBottom?: number; // px reserved for footer
};

export const Body: React.FC<BodyProps> = ({ children, reserveTop = 0, reserveBottom = 40 }) => {
  return <View style={[styles.body, { paddingTop: reserveTop, paddingBottom: reserveBottom }]}>{children}</View>;
};

const styles = StyleSheet.create({
    body: {
      flex: 1,
      paddingVertical: 6,
    },
    center: {
      justifyContent: "center", // vertically center content
    },
  });


