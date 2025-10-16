"use client";

import React, { ReactNode } from "react";
import { View, StyleSheet } from "@react-pdf/renderer";

type HeaderProps = {
  children?: ReactNode;
  forAllPage?: boolean; // If true, repeat on all pages
};

export const Header: React.FC<HeaderProps> = ({ children, forAllPage = false }) => {
  // When forAllPage=true, use `fixed` to render on every page
  return (
    <View style={styles.header} {...(forAllPage ? { fixed: true } : {})}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "10%", // top 10% of the page
    width: "100%",
    justifyContent: "flex-end",
    paddingBottom: 8,
  },
});
