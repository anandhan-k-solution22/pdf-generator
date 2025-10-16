"use client";

import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

type BarDatum = { label: string; value: number | string };

type BarChartProps = {
  data: BarDatum[];
  height?: number; // px
  barWidth?: number; // px
  gap?: number; // px
  barColor?: string;
  title?: string;
  showTitle?: boolean;
  showValues?: boolean;
  allowBreak?: boolean; // if true, may split across pages
};

export const PdfBarChart: React.FC<BarChartProps> = ({
  data,
  height = 120,
  barWidth = 16,
  gap = 8,
  barColor = "#3B82F6",
  title,
  showTitle,
  showValues = true,
  allowBreak = false,
}) => {
  const toNum = (v: any) => (typeof v === "number" ? v : Number(String(v).replace(/[^0-9.-]/g, "")) || 0);
  const max = Math.max(1, ...data.map((d) => toNum(d.value)));
  const shouldShowTitle = title && (showTitle === undefined ? true : showTitle);

  return (
    <View style={styles.wrapper} wrap={allowBreak ? undefined : (false as any)}>
      {shouldShowTitle ? <Text style={styles.title}>{title}</Text> : null}
      <View style={[styles.chart, { height }]}> 
        {data.map((d, idx) => {
          const val = toNum(d.value);
          const h = Math.max(2, Math.round((val / max) * (height - 20)));
          return (
            <View key={idx} style={{ alignItems: "center", marginHorizontal: gap / 2 }}>
              <View style={{ flexDirection: "column-reverse", height }}>
                <View style={{ width: barWidth, height: h, backgroundColor: barColor, borderRadius: 2 }} />
              </View>
              {showValues ? <Text style={styles.value}>{String(d.value)}</Text> : null}
              <Text style={styles.label}>{d.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginTop: 6 },
  title: { fontSize: 12, marginBottom: 6, fontWeight: 700 as any },
  chart: { flexDirection: "row", alignItems: "flex-end", justifyContent: "center" },
  label: { fontSize: 8, marginTop: 2 },
  value: { fontSize: 9, color: "#333" },
});


