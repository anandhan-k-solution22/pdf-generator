"use client"

import { Button } from "@/components/ui/button"
import { DownloadIcon } from "lucide-react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

interface PDFDownloadProps {
  data: any
  formKey: "table" | "grid"
  filename?: string
  title?: string
  className?: string
  companyLogo?: string
  userData?: {
    name?: string
    email?: string
    company?: string
  }
  footerText?: string
}

export function PDFDownload({ 
  data, 
  formKey, 
  filename = "report", 
  title = "Report",
  className = "",
  companyLogo,
  userData,
  footerText = "This email was sent to you because a password reset request was made for your account. If you did not make this request, please contact our support team immediately. Do not share your password or reset link with anyone."
}: PDFDownloadProps) {
  
  const generatePDF = () => {
    const doc = new jsPDF()
    
    // Header - Company name only
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text(companyLogo || "Solution 22", 14, 20)
    
    // Add a line under company name
    doc.setDrawColor(200, 200, 200)
    doc.setLineWidth(0.5)
    doc.line(14, 25, 196, 25)
    
    let yPosition = 35
    
    if (formKey === "table") {
      // Handle table data
      if (Array.isArray(data) && data.length > 0) {
        const headers = Object.keys(data[0])
        const rows = data.map(item => Object.values(item).map(val => String(val)))
        
        autoTable(doc, {
          head: [headers],
          body: rows,
          startY: yPosition,
          styles: {
            fontSize: 9,
            cellPadding: 4,
            lineColor: [200, 200, 200],
            lineWidth: 0.5,
            textColor: [50, 50, 50]
          },
          headStyles: {
            fillColor: [66, 139, 202],
            textColor: 255,
            fontStyle: 'bold',
            fontSize: 10,
            cellPadding: 5
          },
          alternateRowStyles: {
            fillColor: [248, 249, 250]
          },
          margin: { left: 14, right: 14 },
          tableWidth: 'auto'
        })
      }
    } else if (formKey === "grid") {
      // Handle grid/card data
      if (Array.isArray(data)) {
        data.forEach((item, index) => {
          if (yPosition > 280) {
            doc.addPage()
            yPosition = 20
          }
          
          doc.setFontSize(12)
          doc.text(item.title || `Item ${index + 1}`, 14, yPosition)
          yPosition += 8
          
          doc.setFontSize(10)
          Object.entries(item).forEach(([key, value]) => {
            if (key !== 'title') {
              doc.text(`${key}: ${value}`, 20, yPosition)
              yPosition += 6
            }
          })
          yPosition += 10
        })
      } else if (typeof data === 'object' && data !== null) {
        // Handle single object data
        Object.entries(data).forEach(([key, value]) => {
          if (yPosition > 280) {
            doc.addPage()
            yPosition = 20
          }
          doc.setFontSize(10)
          doc.text(`${key}: ${value}`, 14, yPosition)
          yPosition += 8
        })
      }
    }
    
    // Add footer
    const pageHeight = doc.internal.pageSize.height
    const footerY = pageHeight - 20
    
    // Add a line above footer
    doc.setDrawColor(200, 200, 200)
    doc.setLineWidth(0.5)
    doc.line(14, footerY - 5, 196, footerY - 5)
    
    doc.setFontSize(8)
    doc.setTextColor(100, 100, 100)
    doc.text(`Generated On: ${new Date().toLocaleDateString()}`, 14, footerY)
    
    // Save the PDF
    doc.save(`${filename}_${new Date().toISOString().split('T')[0]}.pdf`)
  }
  
  return (
    <Button 
      onClick={generatePDF}
      variant="outline" 
      size="icon"
      className={`bg-card border-border hover:bg-muted ${className}`}
      title="Download PDF"
    >
      <DownloadIcon className="h-4 w-4" />
    </Button>
  )
}
