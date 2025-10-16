"use client";

import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

type Column = { key: string; label?: string; width?: number };

type TableProps = {
  data: Array<Record<string, any>>;
  columns?: Column[];
  title?: string;
  showTitle?: boolean;
  compact?: boolean;
  allowBreak?: boolean; // allow table to split across pages
  repeatHeader?: boolean; // repeat the table header on each page
  headerHeight?: number; // spacer height to avoid overlap when header is fixed
  autoHeaderSpacer?: boolean; // compute spacer automatically when headerHeight not provided
};

export const Table: React.FC<TableProps> = ({
  data,
  columns,
  title,
  showTitle = true,
  compact = false,
  allowBreak = false,
  repeatHeader = true,
  headerHeight,
  autoHeaderSpacer = true,
}) => {
  const inferredColumns: Column[] = React.useMemo(() => {
    if (columns && columns.length) return columns;
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]).map((key) => ({ key, label: key })) as Column[];
  }, [columns, data]);

  const colWidth = 100 / Math.max(1, inferredColumns.length);
  const padding = compact ? 4 : 8;
  const spacer = headerHeight ?? (autoHeaderSpacer ? padding * 2 + 10 + 6 : 24);

  if (!data || data.length === 0) {
    return (
      <View style={styles.wrapper}>
        {showTitle && title && <Text style={styles.title}>{title}</Text>}
        <Text>No data</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      {showTitle && title && <Text style={styles.title}>{title}</Text>}

      {/* Table container that can break across pages */}
      <View style={styles.tableContainer} wrap={allowBreak ? undefined : (false as any)}>
        {/* Header */}
        <View style={styles.headerRow} wrap={false}>
          {inferredColumns.map((col, idx) => (
            <View
              key={col.key || idx}
              style={[styles.th, { width: `${col.width ?? colWidth}%`, padding }]}
            >
              <Text style={styles.thText}>{col.label ?? col.key}</Text>
            </View>
          ))}
        </View>

        {/* Rows */}
        {data.map((row, rIdx) => (
          <View key={rIdx} style={styles.tr} wrap={allowBreak ? undefined : (false as any)}>
            {inferredColumns.map((col, cIdx) => (
              <View
                key={cIdx}
                style={[styles.td, { width: `${col.width ?? colWidth}%`, padding }]}
              >
                <Text style={styles.tdText}>{getCellValue(row, col.key)}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginTop: 6 },
  title: { fontSize: 10, fontWeight: 'bold', marginBottom: 6 },
  tableContainer: { borderWidth: 1, borderColor: "#ddd" },
  headerRow: { flexDirection: "row", backgroundColor: "#f5f5f5", borderBottomWidth: 1, borderBottomColor: "#ddd" },
  tr: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#eee" },
  th: { borderRightWidth: 1, borderRightColor: "#ddd" },
  td: { borderRightWidth: 1, borderRightColor: "#eee" },
  thText: { fontSize: 10, fontWeight: 'bold' },
  tdText: { fontSize: 10 },
});

// Dynamic key matching: supports headers like "s.no" when row uses "sno"
function sanitizeKey(key: string) {
  return String(key).replace(/[^a-zA-Z0-9_]/g, "").toLowerCase();
}

function getCellValue(row: Record<string, any>, headerKey: string) {
  const direct = row[headerKey];
  if (direct !== undefined && direct !== null) return String(direct);
  const target = sanitizeKey(headerKey);
  const matchKey = Object.keys(row).find((k) => sanitizeKey(k) === target);
  const val = matchKey ? row[matchKey] : undefined;
  return val !== undefined && val !== null ? String(val) : "";
}
