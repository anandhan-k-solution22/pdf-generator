"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { DownloadIcon } from "lucide-react"
import { Document, Page, Text, View, StyleSheet, Image, pdf } from "@react-pdf/renderer"

interface ServiceItem {
  sno?: string
  item?: string
  quantity?: string
  estimation?: number
  actualCost?: number
  difference?: number
  paid?: number
  due?: number
  profit?: number
}

interface Service {
  name: string
  percentage: number
  items: ServiceItem[]
  total?: {
    quantity?: string
    estimation?: number
    actualCost?: number
    difference?: number
    paid?: number
    due?: number
    profit?: number
  }
}

interface EventData {
  eventName?: string
  date: string
  country: string
  state: string
  city: string
  venue: string
  eventCategory: string
  allocatedBudget?: number
  paid?: number
  totalSpent?: number
  balance?: number
  due?: number
  budgetUtilized?: number
  remainingBudget?: number
  services?: Service[]
}

interface StaffData {
  name: string
  date: string
  country: string
  state: string
  city: string
  venue: string
  eventCategory: string
  allocatedBudget: string
  paid: string
  totalSpent: string
  balance: string
  due: string
  budgetUtilized: string
  remainingBudget: string
}


interface CommonPrintProps {
  data: StaffData
  formatKey: "grid" | "chart" | "table"
  companyLogo?: string
  className?: string
}

// ---------------- Styles ----------------
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontSize: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderBottom: "1px solid #E5E7EB",
    paddingBottom: 8,
  },
  logo: { width: 50, height: 20 },
  companyName: { fontSize: 12, fontWeight: "bold", color: "#1F2937" },
  eventTitle: { fontSize: 12, marginBottom: 15, fontWeight: 500, color: "#1F2937" },
  section: { marginBottom: 12 },
  sectionTitle: { fontSize: 10, fontWeight: "bold", marginBottom: 8, color: "#374151" },
  detailsGrid: { flexDirection: "row", flexWrap: "wrap", marginBottom: 10 },
  detailItem: { width: "33%", marginBottom: 8 },
  detailLabel: { fontSize: 9, fontWeight: "bold", color: "#6B7280",marginBottom:2 },
  detailValue: { fontSize: 9, color: "#1F2937" },
  table: { marginBottom: 15 },
  tableHeader: { flexDirection: "row", backgroundColor: "#F3F4F6", padding: 8, borderBottom: "1px solid #D1D5DB" },
  tableRow: { flexDirection: "row", padding: 6, borderBottom: "1px solid #E5E7EB" },
  tableCell: { fontSize: 8, padding: 2 },
  tableHeaderCell: { fontSize: 8, fontWeight: "bold", padding: 2 },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderTop: "1px solid #E5E7EB",
    paddingTop: 10,
  },
  footerLeft: { flexDirection: "column", alignItems: "flex-start" },
  footerRight: { flexDirection: "column", alignItems: "flex-end" },
  footerText: { fontSize: 8, color: "#6B7280" },
  footerLogo: { width: 30, height: 12, marginTop: 4 },
  disclaimer: { marginTop: 10, fontSize: 7, color: "#9CA3AF" },
})

// ---------------- PDF Component ----------------
const MAX_ROWS_PER_PAGE = 25 // Adjust based on row height

const renderServiceTable = (service: Service) => {
  const rows = [...service.items]
  if (service.total) rows.push(service.total as any)

  const pages: ServiceItem[][] = []
  for (let i = 0; i < rows.length; i += MAX_ROWS_PER_PAGE) {
    pages.push(rows.slice(i, i + MAX_ROWS_PER_PAGE))
  }

  return pages.map((chunk, pageIndex) => (
    <View key={pageIndex} style={styles.section} wrap={false}>
      <Text style={styles.sectionTitle}>{service.name} - {service.percentage}%</Text>

      {/* Table header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderCell, { width: "10%" }]}>S.No</Text>
        <Text style={[styles.tableHeaderCell, { width: "20%" }]}>Items</Text>
        <Text style={[styles.tableHeaderCell, { width: "10%" }]}>Quantity</Text>
        <Text style={[styles.tableHeaderCell, { width: "12%" }]}>Estimation</Text>
        <Text style={[styles.tableHeaderCell, { width: "12%" }]}>Actual Cost</Text>
        <Text style={[styles.tableHeaderCell, { width: "12%" }]}>Difference</Text>
        <Text style={[styles.tableHeaderCell, { width: "12%" }]}>Paid</Text>
        <Text style={[styles.tableHeaderCell, { width: "12%" }]}>Due</Text>
        <Text style={[styles.tableHeaderCell, { width: "12%" }]}>Profit</Text>
      </View>

      {chunk.map((item, itemIndex) => (
        <View key={itemIndex} style={styles.tableRow}>
          <Text style={[styles.tableCell, { width: "10%" }]}>
            {itemIndex === chunk.length - 1 && service.total ? "Total" : (item.sno || "")}
          </Text>
          <Text style={[styles.tableCell, { width: "20%" }]}>{item.item || ""}</Text>
          <Text style={[styles.tableCell, { width: "10%" }]}>{item.quantity || ""}</Text>
          <Text style={[styles.tableCell, { width: "12%" }]}>{`$${item.estimation?.toLocaleString() || 0}`}</Text>
          <Text style={[styles.tableCell, { width: "12%" }]}>{`$${item.actualCost?.toLocaleString() || 0}`}</Text>
          <Text style={[styles.tableCell, { width: "12%" }]}>{`$${item.difference?.toLocaleString() || 0}`}</Text>
          <Text style={[styles.tableCell, { width: "12%" }]}>{`$${item.paid?.toLocaleString() || 0}`}</Text>
          <Text style={[styles.tableCell, { width: "12%" }]}>{`$${item.due?.toLocaleString() || 0}`}</Text>
          <Text style={[styles.tableCell, { width: "12%" }]}>{`$${item.profit?.toLocaleString() || 0}`}</Text>
        </View>
      ))}

      {pageIndex < pages.length - 1 && <Text break />}
    </View>
  ))
}

const EventPDFDocument = ({ event, companyLogo }: { event: EventData; companyLogo: string }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Image src="/s22_logo.png" style={styles.logo} />
        <Text style={styles.companyName}>{companyLogo}</Text>
      </View>

      {/* Event Title */}
      {event.eventName && <Text style={styles.eventTitle}>{event.eventName}</Text>}

      {/* Event Details */}
      <View style={styles.section}>
        <View style={styles.detailsGrid}>
          {[
            ["Date", event.date],
            ["Country", event.country],
            ["State", event.state],
            ["City", event.city],
            ["Venue", event.venue],
            ["Event Category", event.eventCategory],
          ].map(([label, value], idx) => (
            <View key={idx} style={styles.detailItem}>
              <Text style={styles.detailLabel}>{label}</Text>
              <Text style={styles.detailValue}>{value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Financial Summary */}
      <View style={styles.section}>
        <View style={styles.detailsGrid}>
          {[
            ["Allocated Budget", `$${event.allocatedBudget?.toLocaleString() || "0"}`],
            ["Paid", `$${event.paid?.toLocaleString() || "0"}`],
            ["Total Spent", `$${event.totalSpent?.toLocaleString() || "0"}`],
            ["Balance", `$${event.balance?.toLocaleString() || "0"}`],
            ["Due", `$${event.due?.toLocaleString() || "0"}`],
            ["Budget Utilized", `${event.budgetUtilized || 0}%`],
          ].map(([label, value], idx) => (
            <View key={idx} style={styles.detailItem}>
              <Text style={styles.detailLabel}>{label}</Text>
              <Text style={styles.detailValue}>{value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Services */}
      {event.services?.map((service, idx) => (
        <React.Fragment key={idx}>{renderServiceTable(service)}</React.Fragment>
      ))}

      {/* Footer */}
      <View style={styles.footer} wrap={false}>
        <View style={styles.footerLeft}>
          <Text style={styles.footerText}>Sent by</Text>
          <Image src="/s22_logo.png" style={styles.footerLogo} />
        </View>
        <View style={styles.footerRight}>
          <Text style={styles.footerText}>Generated On: {new Date().toLocaleDateString()}</Text>
        </View>
      </View>

      {/* Disclaimer */}
      <View style={styles.disclaimer} wrap={false}>
        <Text style={styles.footerText}>
          Disclaimer{'\n'}
          This email was sent to you because a password reset request was made for your account. If you did not make this request, please contact our support team immediately. Do not share your password or reset link with anyone.
        </Text>
      </View>
    </Page>
  </Document>
)

// ---------------- Download Button Component ----------------
export function CommonPrint({ data, formatKey, companyLogo = "Solution 22", className = "" }: CommonPrintProps) {
  const generatePDF = async () => {
    const events = Array.isArray(data) ? data : [data]

    for (let event of events) {
      const pdfDoc = <EventPDFDocument event={event} companyLogo={companyLogo} />
      const blob = await pdf(pdfDoc).toBlob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")

      // Clean filename
      let filename = `Events_Report_${new Date().toISOString().split("T")[0]}.pdf`
      if (event.eventName) {
        let eventName = event.eventName.replace(/\s*-\s*[^-]+$/, "-reports")
        eventName = eventName.replace(/[^a-zA-Z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "")
        filename = `${eventName}.pdf`
      }

      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }
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
