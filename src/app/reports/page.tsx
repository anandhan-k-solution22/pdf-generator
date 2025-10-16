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

export default function ReportsPdfPreview() {
  const staffSummary = [
    { label: "Date", value: "December 6, 2024" },
    { label: "Country", value: "India" },
    { label: "State", value: "Karnataka" },
    { label: "City", value: "Chennai" },
    { label: "Venue", value: "Sir Mutha Venkatasubba Rao Concert Hall" },
    { label: "Event Category", value: "Music Concert" },
    { label: "Allocated Budget", value: "10000" },
    { label: "Paid", value: "15300" },
    { label: "Total Spent", value: "5300" },
    { label: "Balance", value: "4700" },
    { label: "Due", value: "0" },
    { label: "Budget Utilized", value: "53.0" },
    { label: "Remaining Budget", value: "46.99" },
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
              {/* Staff Summary Grid */}
              <Row>
                <Grid
                  header="Vijay Antony Live - Chennai"
                  columns={3}
                  gap={8}
                  items={staffSummary}
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

              {/* Service 1 Table */}
              <Row>
                <Div padding={8}>
                  <Table
                    title="Service 1 - 25.00%"
                    showTitle
                    allowBreak
                    repeatHeader
                    data={[
                      { sno: 1, item: "Test", quantity: 100, estimation: "$ 3,000", actualCost: "$ 2,500", difference: "$ 500", paid: "$ 3,000", due: "$ 0", profit: "$ 500" },
                      { sno: 2, item: "Test", quantity: 100, estimation: "$ 3,000", actualCost: "$ 2,500", difference: "$ 500", paid: "$ 3,000", due: "$ 0", profit: "$ 500" },
                      { sno: 3, item: "Test", quantity: 100, estimation: "$ 3,000", actualCost: "$ 2,500", difference: "$ 500", paid: "$ 3,000", due: "$ 0", profit: "$ 500" },
                      { sno: 4, item: "Test", quantity: 100, estimation: "$ 3,000", actualCost: "$ 2,500", difference: "$ 500", paid: "$ 3,000", due: "$ 0", profit: "$ 500" },
                      { sno: 5, item: "Test", quantity: 100, estimation: "$ 3,000", actualCost: "$ 2,500", difference: "$ 500", paid: "$ 3,000", due: "$ 0", profit: "$ 500" },
                      { sno: 6, item: "Test", quantity: 100, estimation: "$ 3,000", actualCost: "$ 2,500", difference: "$ 500", paid: "$ 3,000", due: "$ 0", profit: "$ 500" },
                      { sno: 7, item: "Test", quantity: 100, estimation: "$ 3,000", actualCost: "$ 2,500", difference: "$ 500", paid: "$ 3,000", due: "$ 0", profit: "$ 500" },
                      { sno: 8, item: "Test", quantity: 100, estimation: "$ 3,000", actualCost: "$ 2,500", difference: "$ 500", paid: "$ 3,000", due: "$ 0", profit: "$ 500" },
                      { sno: "Total", quantity: 800, estimation: "$ 24,000", actualCost: "$ 20,000", difference: "$ 4,000", paid: "$ 24,000", due: "$ 0", profit: "$ 4,000" },
                    ]}
                  />
                </Div>
              </Row>

              {/* Service 2 Table */}
              <Row>
                <Div padding={8}>
                  <Table
                    title="Service 2 - 15.00%"
                    showTitle
                    allowBreak
                    repeatHeader
                    data={[
                      { sno: 1, item: "Venue", quantity: 2, estimation: "$ 5,000", actualCost: "$ 4,600", difference: "$ 400", paid: "$ 4,600", due: "$ 0", profit: "$ 400" },
                      { sno: 2, item: "Sound", quantity: 1, estimation: "$ 2,000", actualCost: "$ 1,900", difference: "$ 100", paid: "$ 1,900", due: "$ 0", profit: "$ 100" },
                      { sno: 3, item: "Lighting", quantity: 1, estimation: "$ 1,500", actualCost: "$ 1,400", difference: "$ 100", paid: "$ 1,400", due: "$ 0", profit: "$ 100" },
                      { sno: 4, item: "Security", quantity: 4, estimation: "$ 800", actualCost: "$ 760", difference: "$ 40", paid: "$ 760", due: "$ 0", profit: "$ 40" },
                      { sno: 5, item: "Misc", quantity: 3, estimation: "$ 600", actualCost: "$ 540", difference: "$ 60", paid: "$ 540", due: "$ 0", profit: "$ 60" },
                      { sno: "Total", quantity: 11, estimation: "$ 9,900", actualCost: "$ 9,200", difference: "$ 700", paid: "$ 9,200", due: "$ 0", profit: "$ 700" },
                    ]}
                  />
                </Div>
              </Row>

              {/* Service Total Table */}
              <Row>
                <Div padding={8}>
                  <Table
                    title="Service Total"
                    showTitle
                    allowBreak
                    repeatHeader
                    compact
                    data={[
                      { sno: "Grand Total", quantity: 102, estimation: "$ 8,000", actualCost: "$ 7,100", difference: "$ 900", paid: "$ 7,600", due: "$ 0", profit: "$ 900" },
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
