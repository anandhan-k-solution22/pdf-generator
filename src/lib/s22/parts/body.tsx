"use client";

import React, { ReactNode } from "react";
import { View, StyleSheet } from "@react-pdf/renderer";

export const Body: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <View style={styles.body}>{children}</View>;
};

const styles = StyleSheet.create({
    body: {
      position: "absolute",
      top: "10%",
      height: "80%", // middle 80%
      left: 0,
      right: 0,
      paddingVertical: 6,
      overflow: "hidden",
    },
    center: {
      justifyContent: "center", // vertically center content
    },
  });


