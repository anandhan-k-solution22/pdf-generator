"use client";

import React from "react";
import { Image, Text, View } from "@react-pdf/renderer";

type LogoProps = {
  src?: string;
  fallback?: string;
  maxWidth?: number;
  maxHeight?: number;
};

export const Logo: React.FC<LogoProps> = ({
  src,
  fallback = "",
  maxWidth = 60,
  maxHeight = 30,
}) => {
  if (!src) return <Text>{fallback}</Text>;

  return (
    <Image
      src={src}
      style={{
        width: maxWidth,
        height: maxHeight,
        objectFit: "contain", // preserve aspect ratio and fit inside bounds
      }}
    />
  );
};
