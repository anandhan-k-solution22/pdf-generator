"use client";

import React, { ReactNode } from "react";
import { View, StyleSheet } from "@react-pdf/renderer";

type HeaderProps = {
  children?: ReactNode;
  forAllPage?: boolean; // If true, repeat on all pages
};

export const Header: React.FC<HeaderProps> = ({ children, forAllPage }) => {
  // When forAllPage=true, use `fixed` to render on every page
  return (
    <View style={styles.header} {...(forAllPage ? { fixed: true } : {})}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingBottom: 8,
  },
});
