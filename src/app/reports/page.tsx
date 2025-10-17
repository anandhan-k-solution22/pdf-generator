"use client";

import React from "react";
import {
  PdfPreviewer,
  PrintablePdf,
  Header,
  Logo,
  Line,
  Body,
  Div,
  Row,
  Grid,
  Table,
  PdfBarChart,
  Footer,
} from "s22";

// ---------- Types ----------
type LabelKey = {
  keyLabel: string; // field key
  keyTitle: string; // display title
};

type SummaryItem = {
  label: string;
  value: string;
};

// ---------- Utility: Build summary dynamically ----------
function buildSummary(labelKeys: LabelKey[], labelValues: Record<string, string | number>): SummaryItem[] {
  return labelKeys
    .filter((lk) => lk.keyLabel in labelValues) // only include keys present in labelValues
    .map((lk) => ({
      label: lk.keyTitle,
      value: String(labelValues[lk.keyLabel]),
    }));
}

// ---------- Component ----------
export default function ReportsPdfPreview() {
  // 1️⃣ Field mapping (future-proof: add any new field here)
  const labelKey: LabelKey[] = [
    { keyLabel: "date", keyTitle: "Date" },
    { keyLabel: "country", keyTitle: "Country" },
    { keyLabel: "state", keyTitle: "State" },
    { keyLabel: "city", keyTitle: "City" },
    { keyLabel: "venue", keyTitle: "Venue" },
    { keyLabel: "eventCategory", keyTitle: "Event Category" },
    { keyLabel: "allocatedBudget", keyTitle: "Allocated Budget" },
    { keyLabel: "paid", keyTitle: "Paid" },
    { keyLabel: "totalSpent", keyTitle: "Total Spent" },
    { keyLabel: "balance", keyTitle: "Balance" },
    { keyLabel: "due", keyTitle: "Due" },
    { keyLabel: "budgetUtilized", keyTitle: "Budget Utilized" },
    { keyLabel: "remainingBudget", keyTitle: "Remaining Budget" },
  ];

  // 2️⃣ Dynamic event data (from API or props)
  const labelValue: Record<string, string | number> = {
    date: "December 6, 2024",
    country: "India",
    state: "Karnataka",
    city: "Chennai",
    venue: "Sir Mutha Venkatasubba Rao Concert Hall",
    eventCategory: "Music Concert",
    allocatedBudget: "10000",
    paid: "15300",
    totalSpent: "5300",
    balance: "4700",
    due: "0",
    budgetUtilized: "53.0",
    remainingBudget: "46.99",
  };

  // 3️⃣ Build staff summary dynamically
  const staffSummary = buildSummary(labelKey, labelValue);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <PdfPreviewer height="100vh">
        <PrintablePdf layout="1">
          {/* Header */}
          <Header forAllPage>
            <Logo src="/s22_logo.png" fallback="S22" />
            <Line />
          </Header>

          {/* Body */}
          <Body reserveBottom={60}>
            <Div>
              {/* Dynamic Staff Summary Grid */}
              <Row>
                <Grid
                  header="Vijay Antony Live - Chennai"
                  columns={3} // ✅ Use 1 column to ensure all items render
                  gap={8}
                  items={staffSummary}
                  allowBreak
                />
              </Row>

              {/* Products Table */}
              <Row>
                <Div padding={8}>
                  <Table
                    title="Products"
                    showTitle
                    allowBreak
                    repeatHeader
                    data={[
                      { product: "Tennis Racket", category: "Equipment", sold: "12", revenue: "1800" },
                      { product: "Water Bottle", category: "Accessories", sold: "30", revenue: "450" },
                      { product: "Grip Tape", category: "Accessories", sold: "22", revenue: "176" },
                    ]}
                  />
                </Div>
              </Row>

              {/* Chart */}
              <Row>
                <Div padding={8}>
                  <PdfBarChart
                    title="Bookings by Sport"
                    data={[
                      { label: "Tennis", value: 234 },
                      { label: "Basketball", value: 189 },
                      { label: "Badminton", value: 312 },
                      { label: "Swim", value: 156 },
                    ]}
                  />
                </Div>
              </Row>

              {/* Services Table */}
              <Row>
                <Div padding={8}>
                  <Table
                    title="Service 1 - 25.00%"
                    showTitle
                    allowBreak
                    repeatHeader
                    data={[
                      { sno: 1, item: "Test", quantity: 100, estimation: "$3,000", actualCost: "$2,500", difference: "$500", paid: "$3,000", due: "$0", profit: "$500" },
                      { sno: "Total", quantity: 100, estimation: "$3,000", actualCost: "$2,500", difference: "$500", paid: "$3,000", due: "$0", profit: "$500" },
                    ]}
                  />
                </Div>
              </Row>

              {/* Service Total */}
              <Row>
                <Div padding={8}>
                  <Table
                    title="Service Total"
                    showTitle
                    allowBreak
                    repeatHeader
                    compact
                    data={[
                      { sno: "Grand Total", quantity: 102, estimation: "$8,000", actualCost: "$7,100", difference: "$900", paid: "$7,600", due: "$0", profit: "$900" },
                    ]}
                  />
                </Div>
              </Row>
            </Div>
          </Body>

          {/* Footer */}
          <Footer forAllPage pageCounter brandname="S22" />
        </PrintablePdf>
      </PdfPreviewer>
    </div>
  );
}
