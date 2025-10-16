"use client";

import React from "react";
import { View } from "@react-pdf/renderer";

type LineProps = {
  color?: string;
  thickness?: number;
};

export const Line: React.FC<LineProps> = ({ color = "#000", thickness = 1 }) => {
  return <View style={{ height: thickness, backgroundColor: color, width: "100%", marginVertical: 8 }} />;
};


