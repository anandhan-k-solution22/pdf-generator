"use client";

import React, { ReactNode } from "react";
import { pdf } from "@react-pdf/renderer";
import { PdfDocument } from "./printable-pdf";

type PrintTriggerProps = {
  children: ReactNode; // the PDF structure components
  fileName?: string;
  as?: React.ComponentType<{ onClick: () => void; children: ReactNode }> | "button";
  label?: string;
};

export const PrintTrigger: React.FC<PrintTriggerProps> = ({ children, fileName = "report.pdf", as = "button", label = "Download PDF" }) => {
  const handleClick = async () => {
    const blob = await pdf(<PdfDocument>{children}</PdfDocument>).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (typeof as === "string") {
    return <button onClick={handleClick}>{label}</button>;
  }

  const Trigger = as;
  return <Trigger onClick={handleClick}>{label}</Trigger>;
};


