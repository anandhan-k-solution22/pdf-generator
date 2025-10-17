"use client";

import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

type BarDatum = { label: string; value: number | string };

type BarChartProps = {
  data: BarDatum[];
  height?: number; // px - chart height
  width?: number | string; // px or "100%" - chart width (auto-calculates bar widths)
  barWidth?: number; // px - fixed bar width (ignored if width is set)
  gap?: number; // px - gap between bars
  barColor?: string;
  title?: string;
  showTitle?: boolean;
  showValues?: boolean;
  allowBreak?: boolean; // if true, may split across pages
  justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly"; // flex justification
};

export const PdfBarChart: React.FC<BarChartProps> = ({
  data,
  height = 120,
  width,
  barWidth = 16,
  gap = 8,
  barColor = "#3B82F6",
  title,
  showTitle,
  showValues = true,
  allowBreak = false,
  justify = "center",
}) => {
  const toNum = (v: any) => (typeof v === "number" ? v : Number(String(v).replace(/[^0-9.-]/g, "")) || 0);
  const max = Math.max(1, ...data.map((d) => toNum(d.value)));
  const shouldShowTitle = title && (showTitle === undefined ? true : showTitle);

  // Calculate dynamic bar width if total width is provided
  let calculatedBarWidth = barWidth;
  let calculatedGap = gap;
  
  if (width && typeof width === 'number') {
    const totalBars = data.length;
    const totalGapSpace = gap * (totalBars + 1); // gaps on both sides and between bars
    const availableSpaceForBars = width - totalGapSpace;
    calculatedBarWidth = Math.max(8, Math.floor(availableSpaceForBars / totalBars));
  }

  const chartStyle: any = { ...styles.chart, height, justifyContent: justify };
  if (width) {
    chartStyle.width = width;
  }

  return (
    <View style={styles.wrapper} wrap={allowBreak ? undefined : (false as any)}>
      {shouldShowTitle ? <Text style={styles.title}>{title}</Text> : null}
      <View style={chartStyle}> 
        {data.map((d, idx) => {
          const val = toNum(d.value);
          const h = Math.max(2, Math.round((val / max) * (height - 20)));
          return (
            <View key={idx} style={{ alignItems: "center", marginHorizontal: calculatedGap / 2 }}>
              <View style={{ flexDirection: "column-reverse", height }}>
                <View style={{ width: calculatedBarWidth, height: h, backgroundColor: barColor, borderRadius: 2 }} />
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
  wrapper: { marginTop: 6, marginBottom:10 },
  title: { fontSize: 10, marginBottom: 10, fontWeight: 700 as any },
  chart: { flexDirection: "row", alignItems: "flex-end", justifyContent: "center" },
  label: { fontSize: 8, marginTop: 2 },
  value: { fontSize: 9, color: "#333" },
});


