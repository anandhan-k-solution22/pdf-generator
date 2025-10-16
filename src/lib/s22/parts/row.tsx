"use client";

import React, { ReactNode } from "react";
import { View } from "@react-pdf/renderer";

type RowProps = { children?: ReactNode; gap?: number; allowBreak?: boolean };

export const Row: React.FC<RowProps> = ({ children, gap = 8, allowBreak = false }) => {
  return (
    <View wrap={allowBreak ? undefined : (false as any)} style={{ display: "flex", flexDirection: "row", gap }}>
      {children}
    </View>
  );
};


