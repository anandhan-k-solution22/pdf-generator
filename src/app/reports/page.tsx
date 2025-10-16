"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  DollarSignIcon,
  CalendarIcon,
  UsersIcon,
  ShoppingCartIcon,
  FileChartPie,
  DownloadIcon,
} from "lucide-react";
import { CommonPrint } from "@/components/common-print";
import { PrintablePdf, Header, Logo, Line, Body, Div, Row, Grid, Footer, PrintTrigger, Table, PdfBarChart } from "s22";
import { RevenueChart } from "./_components/revenue-chat";
import { BookingsByTimeChart } from "./_components/bookings-by-time-chart";
import { SportPerformanceChart } from "./_components/sport-performance-chart";
import { PaymentMethodsChart } from "./_components/payment-methods-chart";
import { MembershipStatsChart } from "./_components/membership-stats-chart";
import { CustomerGrowthChart } from "./_components/customer-growth-chart";
import { StaffPerformanceTable } from "./_components/staff-performance-table";
import { TopProductsTable } from "./_components/top-products-table";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
// import Header from "../../_components/header"

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("7d");
  const [environment, setEnvironment] = useState("production");

  // Mock data - replace with actual API calls
  const overview = {
    totalRevenue: 124567.89,
    totalBookings: 1234,
    totalCustomers: 567,
    totalProductsSold: 890,
    revenueChange: 12.5,
    bookingsChange: 8.3,
    customersChange: 15.2,
    productsChange: -3.1,
  };

  // Prepare data for PDF export
  const overviewData = [
    {
      metric: "Total Revenue",
      value: `$${overview.totalRevenue.toLocaleString()}`,
      change: `${overview.revenueChange}%`,
    },
    {
      metric: "Total Bookings",
      value: overview.totalBookings.toString(),
      change: `${overview.bookingsChange}%`,
    },
    {
      metric: "Total Customers",
      value: overview.totalCustomers.toString(),
      change: `${overview.customersChange}%`,
    },
    {
      metric: "Products Sold",
      value: overview.totalProductsSold.toString(),
      change: `${overview.productsChange}%`,
    },
  ];

const staffData = [
  {
    name: "Vijay Antony Live - Chennai",
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
  },
  {
    name: "Vijay Antony Live - Madurai",
    date: "December 8, 2024",
    country: "India",
    state: "Tamil Nadu",
    city: "Madurai",
    venue: "Thamukkam Ground",
    eventCategory: "Music Concert",
    allocatedBudget: "12000",
    paid: "16000",
    totalSpent: "7200",
    balance: "4800",
    due: "0",
    budgetUtilized: "60.0",
    remainingBudget: "40.0",
  },
];

// Dynamic field mapping - automatically generated from data structure
const staffLabels: { key: string; label: string }[] = staffData.length > 0 
  ? Object.keys(staffData[0]).map(key => ({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()
    }))
  : [];

// Dynamic values mapping - mirrors staffLabels structure for flexible value assignment
const staffValues: { key: string; value: string }[] = staffLabels.map(label => ({
  key: label.key,
  value: label.label
}));

// Validation: Check that both staffLabels and staffValues have the same keys
const validateKeyConsistency = () => {
  const labelKeys = staffLabels.map(item => item.key);
  const valueKeys = staffValues.map(item => item.key);
  
  const keysMatch = labelKeys.length === valueKeys.length && 
    labelKeys.every((key, index) => key === valueKeys[index]);
  
  if (!keysMatch) {
    console.error('Key mismatch between staffLabels and staffValues:', {
      labelKeys,
      valueKeys
    });
    throw new Error('staffLabels and staffValues must have matching keys');
  }
  
  return true;
};

// Validate key consistency
validateKeyConsistency();

// Utility function to check key consistency at any time
const checkKeyConsistency = (labels: { key: string; label: string }[], values: { key: string; value: string }[]) => {
  const labelKeys = labels.map(item => item.key);
  const valueKeys = values.map(item => item.key);
  
  return {
    isConsistent: labelKeys.length === valueKeys.length && 
      labelKeys.every((key, index) => key === valueKeys[index]),
    labelKeys,
    valueKeys,
    mismatchedKeys: labelKeys.filter((key, index) => key !== valueKeys[index])
  };
};

// Utility functions for dynamic value assignment
const createValueMapper = (data: any[]) => {
  return (recordIndex: number = 0) => {
    if (!data || data.length === 0 || recordIndex >= data.length) return {};
    
    const record = data[recordIndex];
    return staffLabels.reduce((acc, label) => {
      acc[label.key] = record[label.key] || '';
      return acc;
    }, {} as Record<string, any>);
  };
};

// Create value mapper for staff data
const getStaffValues = createValueMapper(staffData);

// Example usage:
// const valuesForFirstRecord = getStaffValues(0); // Gets values for first record
// const valuesForSecondRecord = getStaffValues(1); // Gets values for second record

// Function to handle backend data changes dynamically
const updateDataStructure = (newData: any[]) => {
  // Re-generate labels based on new data structure
  const newLabels = newData.length > 0 
    ? Object.keys(newData[0]).map(key => ({
        key,
        label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()
      }))
    : [];
  
  // Update values mapping to match new structure
  const newValues = newLabels.map(label => ({
    key: label.key,
    value: label.label
  }));
  
  // Validate key consistency for new structure
  const validateNewStructure = () => {
    const labelKeys = newLabels.map(item => item.key);
    const valueKeys = newValues.map(item => item.key);
    
    const keysMatch = labelKeys.length === valueKeys.length && 
      labelKeys.every((key, index) => key === valueKeys[index]);
    
    if (!keysMatch) {
      console.error('Key mismatch in new structure:', {
        labelKeys,
        valueKeys
      });
      throw new Error('New structure labels and values must have matching keys');
    }
    
    return true;
  };
  
  validateNewStructure();
  
  return {
    labels: newLabels,
    values: newValues,
    valueMapper: createValueMapper(newData)
  };
};

// Usage for backend integration:
// const { labels, values, valueMapper } = updateDataStructure(backendData);
// Now you can use labels, values, and valueMapper with any data structure

// Example: How to use this system dynamically
console.log('Available Fields:', staffLabels.map(l => l.key));
console.log('Field Labels:', staffLabels.map(l => l.label));

// Check key consistency
const consistencyCheck = checkKeyConsistency(staffLabels, staffValues);
console.log('Key Consistency Check:', consistencyCheck);

// Get values for any record dynamically
const firstRecordValues = getStaffValues(0);
console.log('First Record Values:', firstRecordValues);

// This system works with any backend data structure:
// 1. No hardcoded keys - automatically adapts to your data
// 2. Backend can change field names - system adapts automatically  
// 3. Safe for tables, grids, PDFs - consistent structure
// 4. Type-safe and flexible
// 5. Validates key consistency between labels and values

  const staffDataWithChart = [
    {
      name: "Sarah Johnson",
      role: "Manager",
      bookings: 234,
      revenue: 45600,
      rating: 4.8,
      status: "active",
    },
    {
      name: "Michael Chen",
      role: "Receptionist",
      bookings: 189,
      revenue: 38900,
      rating: 4.6,
      status: "active",
    },
    {
      name: "Emily Davis",
      role: "Coach",
      bookings: 156,
      revenue: 34200,
      rating: 4.9,
      status: "active",
    },
    {
      name: "James Wilson",
      role: "Receptionist",
      bookings: 145,
      revenue: 29800,
      rating: 4.5,
      status: "active",
    },
  ];

  const productsData = [
    {
      product: "Tennis Racket Pro",
      category: "Equipment",
      sold: 89,
      revenue: 12450,
      trend: "12.5%",
      stock: 45,
    },
    {
      product: "Sports Water Bottle",
      category: "Accessories",
      sold: 234,
      revenue: 4680,
      trend: "8.3%",
      stock: 120,
    },
    {
      product: "Badminton Shuttlecock Set",
      category: "Equipment",
      sold: 156,
      revenue: 3120,
      trend: "-3.2%",
      stock: 78,
    },
    {
      product: "Grip Tape",
      category: "Accessories",
      sold: 312,
      revenue: 2496,
      trend: "15.7%",
      stock: 200,
    },
    {
      product: "Basketball",
      category: "Equipment",
      sold: 67,
      revenue: 2010,
      trend: "5.4%",
      stock: 34,
    },
  ];

  // Staff charts data
  const staffPieData = staffDataWithChart.map((staff, index) => ({
    name: staff.name,
    value: staff.revenue,
    color: ["#10B981", "#EF4444", "#F59E0B", "#3B82F6"][index % 4],
  }));

  const staffBarData = staffDataWithChart.map((staff, index) => ({
    name: staff.name.split(" ")[0],
    bookings: staff.bookings,
    revenue: staff.revenue,
    rating: staff.rating,
  }));

  const specialButtons = (
    <div className="flex items-center gap-3">
      <Select value={environment} onValueChange={setEnvironment}>
        <SelectTrigger className="w-[140px] bg-card border-border">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="production">Production</SelectItem>
          <SelectItem value="test">Test</SelectItem>
        </SelectContent>
      </Select>
      <Select value={timeRange} onValueChange={setTimeRange}>
        <SelectTrigger className="w-[140px] bg-card border-border">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="24h">Last 24 hours</SelectItem>
          <SelectItem value="7d">Last 7 days</SelectItem>
          <SelectItem value="30d">Last 30 days</SelectItem>
          <SelectItem value="90d">Last 90 days</SelectItem>
          <SelectItem value="1y">Last year</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" size="icon" className="bg-card border-border">
        <CalendarIcon className="h-4 w-4" />
      </Button>
      <CommonPrint
        data={staffData[0]}
        formatKey="table"
        companyLogo="Solution 22"
      />
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      {/* <Header Icon={FileChartPie} title="Reports & Analytics" description="Comprehensive insights into your sports facility performance" logs={[]} specialButtons={specialButtons} /> */}

      {/* S22 PDF Library Test Section */}
      <Card className="bg-card border-border mb-4">
        <CardHeader>
          <CardTitle className="text-foreground">S22 PDF Library Test</CardTitle>
          <CardDescription className="text-muted-foreground">
            Test the new PDF generation library
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <PrintTrigger 
                fileName="staff-report.pdf" 
                label="Download Staff Report PDF"
                as={Button}
              >
                <PrintablePdf layout="1">
                  <Header forAllPage={true}>
                    <Logo src="/s22_logo.png" fallback="S22" />
                    <Line color="black" />
                  </Header>

                  <Body>
                    <Div >
                      <Row>
                        <Grid
                          header="Vijay Antony Live - Chennai"
                          columns={3}
                          gap={8}
                          items={staffLabels.map((l) => ({
                            label: l.label,
                            value: (staffData[0] as any)[l.key],
                          }))}
                        />
                      </Row>
                      <Row>
                        <Div padding={8}>
                          <Table
                            data={[
                              { product: "Tennis Racket", category: "Equipment", sold: "12", revenue: "1800" },
                              { product: "Water Bottle", category: "Accessories", sold: "30", revenue: "450" },
                              { product: "Grip Tape", category: "Accessories", sold: "22", revenue: "176" },
                            ]}
                            title="Products"
                            showTitle
                          />
                        </Div>
                      </Row>
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
                      <Row>
                        <Div padding={8}>
                          {/* Table 2 flows across pages automatically. First part on page 1 */}
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
                      <Row>
                        <Div padding={8}>
                          <Table
                            title="Service Total"
                            showTitle
                            data={[
                              { sno: "Grand Total", quantity: 102, estimation: "$ 8,000", actualCost: "$ 7,100", difference: "$ 900", paid: "$ 7,600", due: "$ 0", profit: "$ 900" },
                            ]}
                            compact
                          />
                        </Div>
                      </Row>
                    </Div>
                  </Body>

                  <Footer forAllPage={true} pageCounter={true} brandname="S22" />
                </PrintablePdf>
              </PrintTrigger>

              <PrintTrigger 
                fileName="overview-report.pdf" 
                label="Download Overview PDF"
                as={({ onClick, children }) => (
                  <Button variant="outline" onClick={onClick}>
                    {children}
                  </Button>
                )}
              >
                <PrintablePdf layout="1">
                  <Header forAllPage={true}>
                    <Logo fallback="S22" />
                    <Line color="#3B82F6" />
                  </Header>

                  <Body>
                    <Div padding={16}>
                      <Row>
                        <Grid
                          header="Overview"
                          columns={3}
                          gap={12}
                          items={[
                            { label: "Total Revenue", value: `$${overview.totalRevenue.toLocaleString()}` },
                            { label: "Total Bookings", value: overview.totalBookings },
                            { label: "Total Customers", value: overview.totalCustomers },
                          ]}
                        />
                      </Row>
                    </Div>
                  </Body>

                  <Footer forAllPage={true} pageCounter={true} brandname="Solution 22" />
                </PrintablePdf>
              </PrintTrigger>
              <Button variant="outline" asChild>
                <a href="/reports/preview" target="_blank" rel="noreferrer">Open full-screen preview</a>
              </Button>
            </div>

            
          </div>
        </CardContent>
      </Card>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSignIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ${overview.totalRevenue.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 mt-1">
              {overview.revenueChange > 0 ? (
                <ArrowUpIcon className="h-4 w-4 text-chart-3" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-destructive" />
              )}
              <span
                className={`text-xs font-medium ${
                  overview.revenueChange > 0
                    ? "text-chart-3"
                    : "text-destructive"
                }`}
              >
                {Math.abs(overview.revenueChange)}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">
                vs last period
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Bookings
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {overview.totalBookings}
            </div>
            <div className="flex items-center gap-1 mt-1">
              {overview.bookingsChange > 0 ? (
                <ArrowUpIcon className="h-4 w-4 text-chart-3" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-destructive" />
              )}
              <span
                className={`text-xs font-medium ${
                  overview.bookingsChange > 0
                    ? "text-chart-3"
                    : "text-destructive"
                }`}
              >
                {Math.abs(overview.bookingsChange)}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">
                vs last period
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Customers
            </CardTitle>
            <UsersIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {overview.totalCustomers}
            </div>
            <div className="flex items-center gap-1 mt-1">
              {overview.customersChange > 0 ? (
                <ArrowUpIcon className="h-4 w-4 text-chart-3" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-destructive" />
              )}
              <span
                className={`text-xs font-medium ${
                  overview.customersChange > 0
                    ? "text-chart-3"
                    : "text-destructive"
                }`}
              >
                {Math.abs(overview.customersChange)}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">
                vs last period
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Products Sold
            </CardTitle>
            <ShoppingCartIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {overview.totalProductsSold}
            </div>
            <div className="flex items-center gap-1 mt-1">
              {overview.productsChange > 0 ? (
                <ArrowUpIcon className="h-4 w-4 text-chart-3" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-destructive" />
              )}
              <span
                className={`text-xs font-medium ${
                  overview.productsChange > 0
                    ? "text-chart-3"
                    : "text-destructive"
                }`}
              >
                {Math.abs(overview.productsChange)}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">
                vs last period
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-0">
        <TabsList className="bg-card border border-border space-x-2 px-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
        </TabsList>

        <div className="overflow-y-auto max-h-[calc(100vh-286px)] custom-scrollbar border border-border rounded-lg p-4 bg-white">
          <TabsContent value="overview" className="space-y-4 ">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Overview Analytics</h3>
              <CommonPrint
                data={staffData[0]}
                formatKey="table"
                companyLogo="Solution 22"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <RevenueChart />
              <BookingsByTimeChart />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <PaymentMethodsChart />
              <MembershipStatsChart />
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Bookings Report</h3>
              <CommonPrint
                data={staffData[0]}
                formatKey="table"
                companyLogo="Solution 22"
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <SportPerformanceChart />
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Booking Status Breakdown
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Distribution of booking statuses over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-foreground">
                        892
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Booked
                      </div>
                      <div className="h-2 bg-chart-1 rounded-full" />
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-foreground">
                        234
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Cancelled
                      </div>
                      <div className="h-2 bg-destructive rounded-full" />
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-foreground">
                        56
                      </div>
                      <div className="text-sm text-muted-foreground">
                        No Show
                      </div>
                      <div className="h-2 bg-chart-4 rounded-full" />
                    </div>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-foreground">
                        52
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Pending
                      </div>
                      <div className="h-2 bg-chart-5 rounded-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Customer Analytics</h3>
              <CommonPrint
                data={staffData[0]}
                formatKey="table"
                companyLogo="Solution 22"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <CustomerGrowthChart />
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Customer Insights
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Key metrics about your customer base
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Active Members
                    </span>
                    <span className="text-lg font-bold text-foreground">
                      342
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Average Bookings/Customer
                    </span>
                    <span className="text-lg font-bold text-foreground">
                      4.2
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Customer Retention Rate
                    </span>
                    <span className="text-lg font-bold text-chart-3">
                      87.5%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Average Customer Value
                    </span>
                    <span className="text-lg font-bold text-foreground">
                      $1,245
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Products Report</h3>
              <CommonPrint
                data={staffData[0]}
                formatKey="table"
                companyLogo="Solution 22"
              />
            </div>
            <TopProductsTable />
          </TabsContent>

          <TabsContent value="staff" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Staff Performance Report
              </h3>
               <CommonPrint
                 data={staffData[0]}
                 formatKey="grid"
                 companyLogo="Solution 22"
               />
            </div>

            {/* Staff Performance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Staff
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {staffDataWithChart.length}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Bookings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {staffDataWithChart.reduce((sum, staff) => sum + staff.bookings, 0)}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    $
                    {staffDataWithChart
                      .reduce((sum, staff) => sum + staff.revenue, 0)
                      .toLocaleString()}
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Average Rating
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {(
                      staffDataWithChart.reduce((sum, staff) => sum + staff.rating, 0) /
                      staffDataWithChart.length
                    ).toFixed(1)}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Staff Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Revenue Distribution
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Revenue share by staff member
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={staffPieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {staffPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [
                          `$${value.toLocaleString()}`,
                          "Revenue",
                        ]}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">
                    Performance Comparison
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Bookings and revenue by staff
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={staffBarData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="hsl(var(--border))"
                      />
                      <XAxis
                        dataKey="name"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <Tooltip
                        formatter={(value, name) => [
                          name === "bookings"
                            ? value
                            : `$${value.toLocaleString()}`,
                          name === "bookings" ? "Bookings" : "Revenue",
                        ]}
                      />
                      <Legend />
                      <Bar
                        dataKey="bookings"
                        fill="hsl(var(--chart-1))"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="revenue"
                        fill="hsl(var(--chart-2))"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <StaffPerformanceTable />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
