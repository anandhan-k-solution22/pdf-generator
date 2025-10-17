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

// ---------- Build summary dynamically ----------
function buildSummary(labelKeys: LabelKey[], labelValues: Record<string, string | number>): SummaryItem[] {
  return labelKeys
    .filter((lk) => lk.keyLabel in labelValues) // only include keys present in labelValues
    .map((lk) => ({
      label: lk.keyTitle,
      value: String(labelValues[lk.keyLabel]),
    }));
}

// ---------- Main PDF Component ----------
export default function ReportsPdfPreview() {
  // Staff summary mapping
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

  const staffSummary = buildSummary(labelKey, labelValue);

  // Dynamic tables from backend
  const productsDataFromAPI = [
    { Name: "Tennis Racket", Category: "Equipment", Sold: 12, Revenue: 1800 },
    { Name: "Water Bottle", Category: "Accessories", Sold: 30, Revenue: 450 },
    { Name: "Grip Tape", Category: "Accessories", Sold: 22, Revenue: 176 },
  ];

  const servicesDataFromAPI = [
    { Item: "Venue", Quantity: 2, Estimation: "$5,000", ActualCost: "$4,600" },
    { Item: "Sound", Quantity: 1, Estimation: "$2,000", ActualCost: "$1,900" },
  ];

  const employeesDataFromAPI = [
    { Sno: 1, name: "Vijay Antony", Quantity: 2, Estimation: "$5,000", ActualCost: "$4,600" },
    { Sno: 2, name: "Ravi Teja", Quantity: 1, Estimation: "$2,000", ActualCost: "$1,900" },
    { Sno: 2, name: "Kumar", Quantity: 1, Estimation: "$2,000", ActualCost: "$1,900" },
    { Sno: 2, name: "Saravanan", Quantity: 1, Estimation: "$2,000", ActualCost: "$1,900" },
    { Sno: 2, name: "Prabhu", Quantity: 1, Estimation: "$2,000", ActualCost: "$1,900" },
    { Sno: 2, name: "Karthik", Quantity: 1, Estimation: "$2,000", ActualCost: "$1,900" },
  ];

  const chartData = [
    { label: "Tennis", value: 234 },
    { label: "Basketball", value: 189 },
    { label: "Badminton", value: 312 },
  ];

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
              {/* Staff Summary */}
              <Row>
                <Grid
                  header="Vijay Antony Live - Chennai"
                  columns={3}
                  gap={8}
                  items={staffSummary}
                  allowBreak
                />
              </Row>

              {/* Dynamic Products Table */}
              <Row>
                <Div>
                  <Table 
                    title="Products" 
                    showTitle
                    allowBreak
                    repeatHeader
                    serialNo={true}
                    data={productsDataFromAPI}
                  />
                </Div>
              </Row>

              {/* Dynamic Services Table */}
              <Row>
                <Div>
                  <Table 
                    title="Services" 
                    showTitle
                    allowBreak
                    repeatHeader
                    serialNo={true}
                    serialNoLabel="S.no"
                    data={servicesDataFromAPI}
                  />
                </Div>
              </Row>

              {/* Chart */}
              <Row>
                <Div padding={8}>
                  <PdfBarChart title="Bookings by Sport" data={chartData} />
                </Div>
              </Row>

              {/* Dynamic Employees Table */}
              <Row>
                <Div>
                  <Table 
                    title="Employees" 
                    showTitle
                    allowBreak
                    repeatHeader
                    serialNo={false}
                    data={employeesDataFromAPI}
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
