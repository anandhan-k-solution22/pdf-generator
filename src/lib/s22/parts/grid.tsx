"use client";

import React, { ReactNode } from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { usePdfData } from "../data-context";

type GridItem = { label: string; value: any };

type GridProps = {
  children?: ReactNode | ((data: any) => ReactNode);
  columns?: number;
  gap?: number;
  header?: string;
  items?: GridItem[];
  allowBreak?: boolean; // if true, component may split across pages
};

export const Grid: React.FC<GridProps> = ({ children, columns = 2, gap = 8, header, items, allowBreak = false }) => {
  const data = usePdfData<any>();
  const resolvedChildren = typeof children === "function" ? children(data) : children;
  const widthPercent = `${100 / columns}%`;
  const childArray = React.Children.toArray(resolvedChildren);
  return (
    <View wrap={allowBreak ? undefined : (false as any)}>
      {header ? <Text style={styles.header}>{header}</Text> : null}
      <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {items && items.length > 0
          ? items.map((kv, idx) => (
              <View key={`kv-${idx}`} style={{ width: widthPercent, padding: gap / 2 }}>
                <Text style={styles.label}>{kv.label}</Text>
                <Text style={styles.value}>{String(kv.value ?? "")}</Text>
              </View>
            ))
          : childArray.map((child, idx) => (
              <View key={idx} style={{ width: widthPercent, padding: gap / 2 }}>{child}</View>
            ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: { fontSize: 12, marginBottom: 6 },
  label: { fontSize: 10, color: '#444', marginBottom:2 },
  value: { fontSize: 10, color: "black" },
});


