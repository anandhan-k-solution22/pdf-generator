"use client"

import { EventReport } from "@/components/event-report"
import { PDFDownload } from "@/components/pdf-download"

export default function EventReportPage() {
  const eventData = {
    title: "Vijay Antony Live - Chennai",
    date: "December 6, 2024",
    city: "Chennai",
    country: "India",
    venue: "Sir Mutha Venkatasubba Rao Concert Hall",
    state: "Karnataka",
    category: "Music Concert"
  }

  const financialData = {
    allocatedBudget: 10000,
    balance: 4700,
    paid: 15300,
    due: 0,
    totalSpent: 5300,
    budgetUtilized: 53.00
  }

  const services = [
    {
      name: "Service 1",
      percentage: 25.00,
      color: "#EF4444",
      items: [
        {
          sno: 1,
          item: "Test",
          quantity: 100,
          estimation: 3000,
          actualCost: 2500,
          difference: 500,
          paid: 3000,
          due: 0,
          profit: 500
        }
      ]
    },
    {
      name: "Service 2",
      percentage: 15.00,
      color: "#F59E0B",
      items: [
        {
          sno: 1,
          item: "Equipment",
          quantity: 50,
          estimation: 2000,
          actualCost: 1800,
          difference: 200,
          paid: 2000,
          due: 0,
          profit: 200
        },
        {
          sno: 2,
          item: "Sound System",
          quantity: 1,
          estimation: 1500,
          actualCost: 1200,
          difference: 300,
          paid: 1500,
          due: 0,
          profit: 300
        }
      ]
    }
  ]

  // Prepare data for PDF export
  const pdfData = [
    { section: "Event Details", data: eventData },
    { section: "Financial Summary", data: financialData },
    { section: "Services", data: services }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Event Report</h1>
          <PDFDownload 
            data={pdfData} 
            formKey="grid" 
            filename="event-report" 
            title="Event Report"
            companyLogo="Budgeting Solutions"
            userData={{
              name: "Event Manager",
              email: "manager@budgeting.com",
              company: "Budgeting Solutions"
            }}
          />
        </div>
        
        <EventReport 
          eventData={eventData}
          financialData={financialData}
          services={services}
        />
      </div>
    </div>
  )
}
