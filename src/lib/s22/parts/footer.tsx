"use client";

import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

type FooterProps = {
  forAllPage?: boolean;
  pageCounter?: boolean;
  brandname?: string;
};

export const Footer: React.FC<FooterProps> = ({
  forAllPage = false,
  pageCounter = true,
  brandname,
}) => {
  return (
    <View style={styles.footer} {...(forAllPage ? { fixed: true } : {})}>
      {brandname && <Text>{brandname}</Text>}
      {pageCounter && (
        <Text
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "10%", // bottom 10% of the page
    width: "100%",
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 10,
  },
});
