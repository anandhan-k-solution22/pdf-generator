"use client";

import React, { ReactNode } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { PrintablePdf, PdfDocument } from "./printable-pdf";
import { PdfData } from "./data-context";

type PdfPreviewerProps = {
  children: ReactNode;
  data?: PdfData;
  height?: number | string;
};

export const PdfPreviewer: React.FC<PdfPreviewerProps> = ({ children, data, height = 600 }) => {
  return (
    <div style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: 6, overflow: "hidden" }}>
      <PDFViewer style={{ width: "100%", height }} showToolbar>
        <PdfDocument>
          <PrintablePdf data={data}>{children}</PrintablePdf>
        </PdfDocument>
      </PDFViewer>
    </div>
  );
};


