"use client";

import React, { ReactNode } from "react";
import { Document, Page, View, StyleSheet } from "@react-pdf/renderer";
import { DataProvider, PdfData } from "./data-context";
import { PdfPage } from "./page";

type PrintablePdfProps = {
  children: ReactNode;
  layout?: "1" | "2" | "3";
  data?: PdfData;
};

export const PrintablePdf: React.FC<PrintablePdfProps> = ({ children, data }) => {
  if (data !== undefined) {
    return <DataProvider data={data}>{children}</DataProvider>;
  }
  return <>{children}</>;
};

export const PdfDocument: React.FC<{ children: ReactNode }> = ({ children }) => {
  const kids = React.Children.toArray(children);
  const pageChildren = kids.filter(
    (c: any) => c?.type?.displayName === "PdfPage" || c?.type?.name === "PdfPage"
  );

  if (pageChildren.length > 0) {
    return (
      <Document>
        {pageChildren.map((pc, idx) => (
          <Page key={idx} size="A4" style={styles.page}>
            {/* When PdfPage is used, we assume the user provides Header/Body/Footer
                as direct children, so we render them as-is without extra wrappers */}
            {(pc as any).props.children}
          </Page>
        ))}
      </Document>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Default: render children directly so Footer can be fixed at bottom and Body can move to new pages */}
        {children}
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 24,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
